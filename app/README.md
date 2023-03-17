## Dev Notes

Things to do in the future:

- still need to do the refresh tokens stuff (for twitch and discord)
- when user disconnects its twitch/discord, the sidebar doens't update the visible pages because, when the user disconnects, rerenders the children only (connection page) so, the sidebar, even tho it receives the children props, doesn't rerender. I thought in some solutions, but, couldn't get one that worked. it is what it is ig

## How to run this

First,install the dependencies

```bash
npm i
```

Them just run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on http://localhost:3000/api/.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
