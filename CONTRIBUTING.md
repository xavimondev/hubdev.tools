# Conference Data Contributing Guidelines

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

## Code of Conduct

Please note that this project is released with a [Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.