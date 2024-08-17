import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { Readable } from 'node:stream'
import { type ReadableStream } from 'node:stream/web'
import { chromium } from 'playwright-chromium'
import sharp from 'sharp'

const DB_PATH = path.join(process.cwd(), './db/')

export function writeDBFile({ data, fileName }: { data: any; fileName?: string }) {
  const file = fileName ? fileName : 'data.json'
  return writeFile(`${DB_PATH}/${file}`, JSON.stringify(data, null, 2), 'utf-8')
}

export async function takeScreenshot({ url, path }: { url: string; path: string }) {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  try {
    await page.goto(url)
    await page.screenshot({ path })
  } catch (error) {
    console.error(error)
  } finally {
    await page.close()
    await browser.close()
  }
}

// Optimize the image
export async function optimizeImageToAvif({
  inputFilePath,
  outputFilePath
}: {
  inputFilePath: string
  outputFilePath: string
}) {
  try {
    const sharpInstance = sharp(inputFilePath)
    const metadata = await sharpInstance.metadata()
    if (metadata.format !== 'webp') {
      await sharpInstance
        // .resize(1200, 630)
        .toFormat('avif')
        .toFile(outputFilePath)
      console.log(`Done: ${outputFilePath}`)
    }
  } catch (error) {
    console.error(`Error ${inputFilePath}:`, error)
  }
}

export function isURL({ url }: { url: string }) {
  try {
    new URL(url)
    return true
  } catch (e) {
    console.log(e, url)
    return false
  }
}

export async function writeImage({
  response,
  pathFile,
  nameFile
}: {
  response: Response
  pathFile: string
  nameFile: string
}) {
  const body = Readable.fromWeb(response.body as ReadableStream<any>)
  const imagePath = path.join(pathFile, nameFile)
  await writeFile(imagePath, body)
}
