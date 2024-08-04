<p align="center">
  <a href=https://github.com/xavimondev/hubtools.dev target="_blank">
    <img src='https://hubtools.vercel.app/assets/banner.png' width="100%" alt="Banner" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white" alt="Nextjs" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript"  />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-0F172A?logo=tailwind-css&logoColor=38BDF9" alt="TailwindCSS"  />
  <img src="https://img.shields.io/github/contributors/xavimondev/hubtools.dev" alt="GitHub contributors" />
  <img src="https://img.shields.io/github/issues-pr/xavimondev/hubtools.dev" alt="GitHub pull request" />
  <img src="https://img.shields.io/github/license/xavimondev/hubtools.dev" alt="GitHub License" />
</p>

<p><p>
<p><p>

## 📌 Overview

A great collection of essential resources and tools for developers, thoughtfully categorized. Simplify your searches with our powerful semantic search engine. Discover UI inspiration, books, courses, testing tools, icons, and much more.
It uses semantic search to find the right resources for your project. Powered by Vercel SDK, OpenAI, and Groq.

## 🔍 Table of Contents

- [Features](#features)

- [Stack](#stack)

- [Project Summary](#project-summary)

- [Setting Up](#setting-up)

- [Run Locally](#run-locally)

- [License](#license)

## Features

## Stack

- [next](https://nextjs.org/): A framework for building server-rendered React applications.
- [typescript](https://www.typescriptlang.org/): A typed superset of JavaScript that compiles to plain JavaScript.
- [shadcn/ui](https://ui.shadcn.com/): Provides beautifully designed components for UI.
- [tailwindcss](https://tailwindcss.com/): A utility-first CSS framework for rapid UI development.
- [sonner](https://github.com/emilkowalski/sonner): An opinionated toast component for React.
- [lucide](https://lucide.dev/): Beautiful & consistent icons.
- [zod](https://github.com/colinhacks/zod): TypeScript-first schema validation with static type inference

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

1.Clone the hubtools.dev repository:

```sh
git clone https://github.com/xavimondev/hubtools.dev
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

This project is licensed under the **MIT License** - see the [**MIT License**](https://github.com/xavimondev/hubtools.dev/blob/main/LICENSE) file for details.