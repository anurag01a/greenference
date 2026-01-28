# Deployment Instructions

## Deploying to Vercel

1.  **Open your terminal.**
2.  **Run the deployment command:**
    Since you might not have the Vercel CLI installed globally, use `npx`:
    ```bash
    npx vercel
    ```
    *Note: If asked to install the `vercel` package, type `y` and press Enter.*

3.  **Follow the interactive prompts:**
    - **Log in:** It will open your browser to log in to Vercel.
    - **Setup:** It will ask "Set up and deploy?". Type `Y` (Yes).
    - **Scope:** Select your account.
    - **Link to existing project:** `N` (No) if this is a new deployment.
    - **Project Name:** Press Enter to accept the default or type a new name.
    - **Directory:** Press Enter (should be `./`).
    - **Build Settings:** Vercel usually auto-detects Vite.
        - If it asks "Want to modify these settings?", usually `N` (No) is fine as defaults work for Vite.

4.  **Wait for deployment:** Vercel will build and deploy your site. It will provide a `Production` or `Preview` URL.

## Deploying to Production (Live)
To deploy a production build (not a preview):
```bash
npx vercel --prod
```

## Frequently Asked Questions

**Q: Do I need to run `npm run build` locally before deploying?**
A: **No.** Vercel runs the build command automatically in the cloud. You only need to run `npm run build` if you want to test the build locally before deploying.
