<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1KuX2j21DuHpXO2EH0tz0B1_3VwZKi_67

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env.local` file in the root directory and set your Gemini API key:
   ```bash
   VITE_API_KEY=your_gemini_api_key_here
   ```
   Get your API key from: https://aistudio.google.com/apikey
3. Run the app:
   ```bash
   npm run dev
   ```

## Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push
   ```

2. **Import project to Vercel:**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings

3. **Set Environment Variables:**
   - In the project settings, go to **Settings → Environment Variables**
   - Add a new variable:
     - **Name:** `VITE_API_KEY`
     - **Value:** Your Gemini API key
     - **Environment:** Select all (Production, Preview, Development)
   - Click "Save"

4. **Deploy:**
   - Click "Deploy" and wait for the build to complete
   - Your app will be live at `https://your-project-name.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   Follow the prompts and set `VITE_API_KEY` when asked for environment variables.

4. **For production deployment:**
   ```bash
   vercel --prod
   ```

### Important Notes

- The environment variable must be named `VITE_API_KEY` (with the `VITE_` prefix) for Vite to expose it to the client-side code
- Make sure your `.env.local` file is in `.gitignore` (it should be by default)
- After setting environment variables in Vercel, you may need to redeploy for changes to take effect
