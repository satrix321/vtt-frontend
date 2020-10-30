This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Test User

email: admin@gmail.com
password: adminq1@W

## Prisma Migrations

1. Modify the schema
2. Run the following commands:

```
npx @prisma/cli migrate save --experimental
npx @prisma/cli migrate up --experimental
npx @prisma/cli generate
```

## Localstack [WIP]

1. Install localstack & run it

```
DATA_DIR="/tmp/localstack/data" localstack start
```

2. Install awscli-local

```
pip install awscli-local
```

3. Create VTT Bucket

```
awslocal s3 mb s3://vtt
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/zeit/next.js/) - your feedback and contributions are welcome!

## Deploy on ZEIT Now

The easiest way to deploy your Next.js app is to use the [ZEIT Now Platform](https://zeit.co/) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
