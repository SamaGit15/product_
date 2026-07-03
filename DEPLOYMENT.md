# Vercel Deployment Guide

## 1. Prepare services

- Create a MongoDB Atlas cluster and copy the connection string.
- Create a Cloudinary account and collect:
  - `CLOUDINARY_URL`
- Optional: create a Gemini API key for the assistant.

## 2. Environment variables

Set these in Vercel:

```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=replace-with-a-long-random-secret
DEFAULT_ADMIN_NAME=AI-Solutions Admin
DEFAULT_ADMIN_EMAIL=admin@aisolutions.com
DEFAULT_ADMIN_PASSWORD=Admin@12345
CLOUDINARY_URL=cloudinary://your-api-key:your-api-secret@your-cloud-name
GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.5-flash
NEXT_PUBLIC_API_BASE_URL=
```

Leave `NEXT_PUBLIC_API_BASE_URL` empty for normal same-origin Vercel deployment.

## 3. Deploy

1. Push the repo to GitHub.
2. Import the repository into Vercel.
3. Keep the framework preset as `Next.js`.
4. Add the environment variables.
5. Deploy.

## 4. Seed the database

Run locally with your production `.env` values:

```bash
npm install
npm run seed
```

This recreates the demo content and default admin account.

## 5. Notes

- Cloudinary uploads happen through the same Vercel project, so no separate upload server is needed.
- Admin login uses JWT stored in the browser local storage.
- If `GEMINI_API_KEY` is not set, the assistant will return a configuration error instead of crashing the site.
