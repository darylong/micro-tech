This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Second, create .env file and fill up relevant variables shown in `env.example`

```
DATABASE_URL=
OPENAI_API_KEY=
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Endpoints


```
1. [GET] api/correctness:
Return all messages stored in database.

2. [POST] /api/correctness:
Create one new message that will be corrected by OpenAI API & stored in database.

3. [POST] /api/random:
Return one random messages stored in database.
```

## Product Demo
![Product Demo Screenshot](https://drive.google.com/uc?export=view&id=1OxtCCZlmXaI2qT8xX9CNN13OZO1DmLKv)

Product is also hosted on Vercel and can be accessd through:
https://micro-tech.vercel.app/