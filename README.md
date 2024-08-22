
<div align="center">

[![hubdev](https://res.cloudinary.com/marcomontalbano/image/upload/v1723954225/video_to_markdown/images/video--4b6ff47aa62838d99e0725f3024fdc2a-c05b58ac6eb4c4700831b2b3070cd403.jpg)](https://res.cloudinary.com/di19fkmzs/video/upload/v1723953989/hubtoolsdev/demo/demov2.mp4 "hubdev")

<p>Empowering Developers with Essential Tools and Seamless Semantic Search.</p> 
<img src="https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white" alt="Nextjs" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript"  />
<img src="https://img.shields.io/badge/Tailwind%20CSS-0F172A?logo=tailwind-css&logoColor=38BDF9" alt="TailwindCSS"  />
<img src="https://img.shields.io/github/contributors/xavimondev/hubdev.tools" alt="GitHub contributors" />
<img src="https://img.shields.io/github/issues-pr/xavimondev/hubdev.tools" alt="GitHub pull request" />
<img src="https://img.shields.io/github/license/xavimondev/hubdev.tools" alt="GitHub License" />
<p><p>
<p><p>
</div>

## Overview

A comprehensive collection of essential resources and tools for developers, thoughtfully categorized to streamline your development process. Utilize advanced semantic search, powered by Vercel SDK, OpenAI, and Supabase, to find exactly what you need. Effortlessly discover UI inspiration, books, courses, testing tools, icons, and much more with ease and efficiency.

## Table of Contents

- [Features](#features)

- [How was built](#how-was-built)

- [Stack](#stack)

- [Project Summary](#project-summary)

- [Setting Up](#setting-up)

- [Run Locally](#run-locally)

- [License](#license)

## Features

### AI Powered Semantic Search

Leverage the power of AI with a semantic search engine, which uses Supabase embeddings and OpenAI to deliver highly relevant resources based on user input. Ensure smooth performance and efficient query handling with Upstash, providing rate limiting and query caching.

### Auto-Suggestions

Automatically suggest relevant resources based on the user's input, powered by `llama-3.1-70b-versatile`.


### Resources Summary

Provide a brief summary of the generated resources powered by `llama-3.1-8b-instant`. This feature offers concise summaries in both English and Spanish.

### Search Suggestions

Improve the search experience with intelligent search suggestions based on your history, powered by `gpt-4o-mini`.

## How was built

The code is found [here](./scrapping/).

The construction of this project followed a systematic approach to ensure efficiency and accuracy in gathering and processing resources. Below is the detailed process:

### Generating Links Array

Initially, an array of links was created in the format: 

```
[{
  url: 'https://linkresource.com'
}]
```

### Scraping Metadata

Using Cheerio, I scraped the meta tags: title, description, and image from each link.
When it comes to handling images, I followed a specific approach:

- OpenGraph Image: If an OpenGraph image was available, it was optimized and uploaded to Supabase.
- No OpenGraph Image: If no OpenGraph image was found, [Playwright](https://playwright.dev/) was used to take a screenshot of the website.

All the images were optimized using [Sharp](https://github.com/lovell/sharp), then uploaded to Supabase.

### Generating Summaries

The HTML of the initial page was obtained and sent to OpenAI to generate a summary of the website, providing a clearer understanding of its content. The model used was `gpt-4o-mini`.

### Storing and Embedding Resources

With the images stored in Supabase, along with the summary and description of each website, embeddings were generated for each resource. I've used the model `text-embedding-3-small`.
All this information was then bulk inserted into Supabase.

### Regular Updates

The resources are updated every hour to ensure the information remains current.
```
export const revalidate = 60
```

## Stack

- [Vercel AI SDK](https://sdk.vercel.ai/): The Vercel AI SDK to help developers build AI-powered applications.
- [Next](https://nextjs.org/): A framework for building server-rendered React applications.
- [Uptash](https://upstash.com/): Rate limiting and queries caching.
- [Supabase](supabase.com): For storing og images, resources and embeddings.
- [Serper](https://serper.dev/): For searching suggestions from the internet.
- [Shadcn/ui](https://ui.shadcn.com/): Provides beautifully designed components for UI.
- [Tailwindcss](https://tailwindcss.com/): A utility-first CSS framework for rapid UI development.
- [Zod](https://github.com/colinhacks/zod): TypeScript-first schema validation with static type inference
- [Cheerio](https://cheerio.js.org/): A fast, flexible, and lean library for web scraping and parsing HTML.
- [Playwright](https://playwright.dev/): A framework for end-to-end testing and automation.
- [Sharp](https://github.com/lovell/sharp): A Node.js library for manipulating images in a variety of ways.

## Project Summary

- [**public**](public): Public directory for static assets and build output.
- [**src/app**](src/app): Contains the main application logic and components.
- [**src/components**](src/components): Houses reusable UI components.
- [**src/hooks**](src/hooks): Custom React hooks for managing state and side effects.
- [**src/actions**](src/actions): Server actions for interacting with external APIs.
- [**src/types**](src/types): TypeScript type definitions.
- [**src/utils**](src/utils): Miscellaneous utility functions.

## Setting Up

### OPENAI_API_KEY

- Go to the [OpenAI website](https://openai.com/).
- Sign in to your account or create a new one.
- Navigate to your [API settings](https://platform.openai.com/account/api-keys).
- Generate an Secret key.
- Copy the generated Secret key.

### UPSTASH_REDIS_REST_URL - UPSTASH_REDIS_REST_TOKEN

- Go to the Uptash [console](https://console.upstash.com/).
- Sign in to your account or create a new one.
- Navigate to your database.
- Copy the generated keys.

### SUPABASE_URL - SUPABASE_SERVICE_ROLE_KEY

- Go to the [Supabase website](https://supabase.com/).
- Sign in to your account or create a new one.
- Navigate to your project.
- Go to the "Project Settings" menu.
- Under "API" section, copy the "URL" and "Service Role Key".

### SERPER_API_KEY

- Go to the [Serper website](https://serper.dev).
- Sign in to your account or create a new one.
- Go to the "API Key" menu.
- Generate a new API key.

### GROQ_API_KEY

- Go to the [Groq console](https://console.groq.com/keys).
- Sign in to your account or create a new one.
- Create a new key.

## Run Locally

1.Clone the hubdev.tools repository:

```sh
git clone https://github.com/xavimondev/hubdev.tools
```

2.Rename the `.env.example` to `.env`:

```bash
mv .example.env .env
```

3.Install dependencies:

```bash
# bun
bun install
# pnpm
pnpm install
# npm
npm install
# yarn
yarn install
```

6.Start the development mode:

```bash
# bun
bun dev
# pnpm
pnpm dev
# npm
npm run dev
# yarn
yarn dev
```

## License

This project is licensed under the **MIT License** - see the [**MIT License**](https://github.com/xavimondev/hubdev.tools/blob/main/LICENSE) file for details.