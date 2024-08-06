<p align="center">
  <a href=https://github.com/xavimondev/hubdev.tools target="_blank">
    <img src='https://hubdevtools.vercel.app/assets/banner.png' width="100%" alt="Banner" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white" alt="Nextjs" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript"  />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-0F172A?logo=tailwind-css&logoColor=38BDF9" alt="TailwindCSS"  />
  <img src="https://img.shields.io/github/contributors/xavimondev/hubdev.tools" alt="GitHub contributors" />
  <img src="https://img.shields.io/github/issues-pr/xavimondev/hubdev.tools" alt="GitHub pull request" />
  <img src="https://img.shields.io/github/license/xavimondev/hubdev.tools" alt="GitHub License" />
</p>

<p><p>
<p><p>

## Overview

A great collection of essential resources and tools for developers, thoughtfully categorized. Simplify your searches with powerful semantic search engine.
It uses semantic search to find the right resources for your project. Powered by Vercel SDK, OpenAI, and Groq.

## Table of Contents

- [Features](#features)

- [Stack](#stack)

- [Project Summary](#project-summary)

- [Setting Up](#setting-up)

- [Run Locally](#run-locally)

- [License](#license)

## Features

### AI Powered Semantic Search

The AI-powered semantic search engine uses Vercel AI SDK to generate autocomplete suggestions based on user input. It uses the Groq API to generate text completions and the Serper API to search for relevant resources. The search engine also uses Upstash to rate limit requests and Supabase to store and retrieve resources and embeddings.

### Voice Synthesis

The voice synthesis feature uses the AWS Polly API to generate speech from text. It supports English and Spanish languages.

### Resources Summary

The resources summary feature uses the Groq API to generate a summary of the selected resources. It supports English and Spanish languages.

### Search Suggestions

The search suggestions feature uses the OpenAI to generate autocomplete suggestions based on user search history and input.


## Building Proccess

## Stack

- [Vercel AI SDK](https://vercel.com/docs/concepts/functions/serverless-functions/ai): The Vercel AI SDK is the TypeScript toolkit designed to help developers build AI-powered applications.
- [Next](https://nextjs.org/): A framework for building server-rendered React applications.
- [Uptash](https://upstash.com/): For rate limiting and queries caching.
- [Supabase](supabase.com): For storing og images, resources and embeddings.
- [Serper](https://serper.dev/): For searching suggestions from the internet.
- [Shadcn/ui](https://ui.shadcn.com/): Provides beautifully designed components for UI.
- [Tailwindcss](https://tailwindcss.com/): A utility-first CSS framework for rapid UI development.
- [Zod](https://github.com/colinhacks/zod): TypeScript-first schema validation with static type inference

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