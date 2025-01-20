
<div align="center">

<a href=https://github.com/xavimondev/hubdev.tools target="_blank">
  <img src='https://hubdev.tools/assets/banner.jpg' width="100%" alt="Banner" />
</a>

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

- [Stack](#stack)

- [Project Summary](#project-summary)

- [Setting Up](#setting-up)

- [Run Locally](#run-locally)

- [License](#license)

## Stack

- [Vercel AI SDK](https://sdk.vercel.ai/): The Vercel AI SDK to help developers build AI-powered applications.
- [Next](https://nextjs.org/): A framework for building server-rendered React applications.
- [Uptash](https://upstash.com/): Rate limiting and queries caching.
- [Supabase](supabase.com): For storing og images, resources and embeddings.
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

### UPSTASH_REDIS_REST_URL - UPSTASH_REDIS_REST_TOKEN

- Go to the Uptash [console](https://console.upstash.com/).
- Sign in to your account or create a new one.
- Navigate to your database.
- Copy the generated keys.

### SUPABASE KEYS

- Go to the [Supabase website](https://supabase.com/).
- Sign in to your account or create a new one.
- Navigate to your project.
- Go to the "Project Settings" menu.
- Under "API" section, copy the "URL" and "Service Role Key".

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