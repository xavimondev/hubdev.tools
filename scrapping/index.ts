/*Run:
pnpm add @ai-sdk/openai ai cheerio html-to-text sharp zod -E
pnpm add @types/node @types/html-to-text playwright-chromium tsx typescript -D -E
*/


import path from 'node:path'
import { setTimeout } from 'node:timers/promises'
import { openai } from '@ai-sdk/openai'
import * as cheerio from 'cheerio'
import { htmlToText } from 'html-to-text'
import { embed } from "ai";

import { generateSlug, generateSummaryAndCategory } from './ai'
import { isURL, optimizeImageToAvif, takeScreenshot, writeDBFile, writeImage } from './utils'

import listOfResources from "./db/local-db.json" assert { type: "json" };
import urls from "./db/urls.json" assert { type: "json" };

async function updateData({ url }: { url: string }) {
  urls.forEach((item) => {
    if (item.url === url) {
      item.done = true;
    }
  });

  writeDBFile({ data: urls, fileName: "urls.json" });
}

async function scrape({ url }: { url: string }) {
  const res = await fetch(url)
  const html = await res.text()
  return cheerio.load(html)
}

async function scrapeAndSave({ url }: { url: string }) {
  const start = performance.now()
  // 1. Scrapping resources to get slug, title, description, summary, image
  try {
    console.log(`Scraping [${url}]...`)
    const $ = await scrape({ url })
    const body = $('body').html()
    let title = $('title').text().trim()

    let description = $('meta[name="description"]').attr('content')
    if (!description) {
      description = $('meta[property="og:description"]').attr('content')
    }
    if (!description) {
      description = $('meta[name="twitter:description"]').attr('content')
    }

    const webDescription = `${description}`.trim() || 'WD'

    title = title.length > 100 ? title.substring(0, 100) : title
    // // Change this weird code
    const slug = await generateSlug({ url })

    // Generating text from HTML
    let htmlContent = htmlToText(body as string, {
      baseElements: {
        selectors: ['h1', 'p']
      },
      longWordSplit: {
        forceWrapOnLimit: true
      },
      preserveNewlines: false,
      wordwrap: 100,
      formatters: {
        paragraph: (elem: any, wd: any, builder: any) => {
          if (elem.children && elem.children.length > 0 && elem.children[0].data) {
            builder.addInline(elem.children[0].data)
          }
        }
      },
      selectors: [
        {
          selector: 'p',
          format: 'paragraph',
          options: { leadingLineBreaks: 1, trailingLineBreaks: 1 }
        }
      ]
    })

    htmlContent = htmlContent.length > 1500 ? htmlContent.substring(0, 1500) : htmlContent

    // Generate summary using LLM - OpenAI for a given resource
    const { category, summary } = await generateSummaryAndCategory({
      webDescription,
      htmlContent,
      url
    })

    // Storing the og image
    const ogImage = $('meta[property="og:image"]').attr('content')
    let urlImage = ''
    // Store the image in a local folder
    if (ogImage) {
      const isValidUrl = isURL({ url: ogImage })
      const validUrl = isValidUrl ? ogImage : `${url}${ogImage}`
      const response = await fetch(validUrl)
      const imagesDirectory = path.join('images')

      if (response.ok) {
        await writeImage({
          response,
          pathFile: imagesDirectory,
          nameFile: `${slug}.png`
        })
        urlImage = path.join('images', `${slug}.png`)
      }
    }

    // Take screenshot of the page as long as the image is not available
    if (!urlImage) {
      urlImage = path.join('images', `${slug}.png`)
      await takeScreenshot({ path: urlImage, url })
    }

    // Optimizing the image
    const outputFilePath = path.join('db-images', slug).concat('.avif')
    await optimizeImageToAvif({ inputFilePath: urlImage, outputFilePath })

    // Looking for the category in the database and getting the id
    // @ts-ignore
    const categoryItem = await findCategoryByName({ name: category })

    if (categoryItem) {
      const { id: idCategory } = categoryItem
      const urlData = {
        slug,
        title,
        url,
        description: webDescription,
        summary,
        image: urlImage,
        category,
        idCategory
      }

      // @ts-ignore
      listOfResources.push(urlData)
      console.log(`[${url}] scrapped successfully`)
      // update "done" attribute in database urls.json
      updateData({ url })
      // add new resources to local-db.json
      await writeDBFile({ data: listOfResources, fileName: 'local-db.json' })
      await setTimeout(5000)
    }
  } catch (e) {
    console.error(`Error scraping [${url}]`)
    console.error(e)
  } finally {
    const end = performance.now()
    const time = (end - start) / 1000
    console.log(`[${url}] scraped in ${time} seconds`)
  }
}

async function index() {
  console.log('Starting scraping...')
  const linksToScrape = urls.filter((link: any) => !link.done)
  for (const infoToScrape of linksToScrape) {
    const { url } = infoToScrape
    await scrapeAndSave({ url })
  }
  console.log('Ending scraping...')
}

async function saveResourcesInDatabase() {
  const results = []
  if (!listOfResources || !Array.isArray(listOfResources)) return
  try {
    for (const resource of listOfResources) {
      const { slug, summary, title, url, description, image, idCategory } = resource


      const [_, format] = image.split('.')
      // Retrieve image url
      const imageUrl = searchImageUrl({ slug, format: format ?? 'png' })
      // Generate embedding for the summary
      const { embedding } = await embed({
        model: openai.embedding('text-embedding-3-small'),
        value: summary
      })

      const resourceItem = {
        slug,
        title,
        url,
        description,
        image: imageUrl,
        summary,
        idCategory,
        embedding
      }

      // Store the resource in the database
      const res = await insertResources({ data: resourceItem })
      results.push(resourceItem)
      console.log(`Resource: ${slug} - ${res.status}`)

      await setTimeout(500)
    }

    await writeDBFile({ data: results, fileName: 'results.json' })
  } catch (error) {
    console.error(error)
  }
}

// index().catch(console.error)