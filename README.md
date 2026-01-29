# Album organizer app

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/renoxoco-7708s-projects/v0-album-organizer-app)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/thAj2lPWvjZ)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Deployment

Your project is live at:

**[https://vercel.com/renoxoco-7708s-projects/v0-album-organizer-app](https://vercel.com/renoxoco-7708s-projects/v0-album-organizer-app)**

### Hosting on GitHub Pages

This project has been configured for static export to support hosting on **GitHub Pages**.

#### Changes made for GitHub Pages:
1.  **Static Export**: Enabled `output: 'export'` in `next.config.mjs`.
2.  **Client-side Search**: Replaced the server-side Spotify/Deezer search with a client-side iTunes Search API implementation. This allows the search feature to work perfectly on static hosting like GitHub Pages.
3.  **API Routes**: Renamed `app/api` to `app/_api` to prevent build failures during static export. The original server-side code is preserved but not used in the static deployment.
4.  **GitHub Action**: Added a deployment workflow in `.github/workflows/nextjs.yml`.

#### How to enable GitHub Pages:
1.  Push these changes to your GitHub repository.
2.  Go to your repository settings on GitHub.
3.  Select **Pages** from the left sidebar.
4.  Under **Build and deployment > Source**, select **GitHub Actions**.
5.  The site will automatically build and deploy on the next push to `main`.

**Note:** The search feature has been migrated to the client-side using the iTunes Search API to ensure it works on GitHub Pages without a backend server.

## Build your app

Continue building your app on:

**[https://v0.app/chat/thAj2lPWvjZ](https://v0.app/chat/thAj2lPWvjZ)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository