# AI-Solutions Next.js Version

This project has been converted into a single Next.js app so it can be deployed on Vercel as one project instead of running a separate frontend and backend service.

## What changed

- Public site and admin dashboard now run from one Next.js app.
- Old server endpoints were moved into Next route handlers under `app/api/[...path]/route.ts`.
- MongoDB is used through secure server-side route handlers.
- Image uploads are sent to Cloudinary.
- The original React UI was migrated into `src/` and kept functional.

## Tech stack

- Next.js
- React 19
- Tailwind CSS 4
- MongoDB Atlas with Mongoose
- Cloudinary
- JWT + bcrypt admin auth
- Gemini API for the site assistant

## Local setup

1. Copy `.env.example` to `.env`.
2. Add your MongoDB Atlas URI and Cloudinary URI.
3. Install dependencies:

```bash
npm install
```

4. Seed demo data:

```bash
npm run seed
```

5. Start the app:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Default admin login

- Email: `admin@aisolutions.com`
- Password: `Admin@12345`

Override them with `DEFAULT_ADMIN_EMAIL`, `DEFAULT_ADMIN_PASSWORD`, and `DEFAULT_ADMIN_NAME` in `.env`.

## Important note

MongoDB should not be connected directly from browser-only code. This repo now uses one Vercel-hosted Next.js project with secure server-side route handlers, which is the right way to keep the whole site in one deploy while still using MongoDB and Cloudinary.
