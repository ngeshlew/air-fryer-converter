# Deploy to Netlify - Step-by-Step Guide

This guide walks you through deploying your Air Fryer Converter frontend to Netlify.

## Prerequisites

✅ GitHub repository: https://github.com/ngeshlew/air-fryer-converter  
✅ Railway backend deployed with public domain  
✅ Backend API URL ready (e.g., `https://air-fryer-api.up.railway.app`)

---

## Step 1: Sign Up / Log In to Netlify (1 minute)

<Steps>
<Step title="Create Netlify account">
  1. Go to [Netlify.com](https://www.netlify.com/)
  2. Click **"Sign up"** (or "Log in" if you have an account)
  3. Choose **"Continue with GitHub"**
  4. Authorize Netlify to access your GitHub account
</Step>
</Steps>

---

## Step 2: Import Project from GitHub (2 minutes)

<Steps>
<Step title="Start new site">
  1. From your Netlify dashboard, click **"Add new site"**
  2. Select **"Import an existing project"**
  
  <Frame>
  You'll see options: GitHub, GitLab, Bitbucket
  </Frame>
</Step>

<Step title="Connect to GitHub">
  1. Click **"Deploy with GitHub"**
  2. If prompted, click **"Configure the Netlify app on GitHub"**
  3. Choose to give Netlify access to:
     - **All repositories**, or
     - **Only select repositories** → Select `ngeshlew/air-fryer-converter`
  4. Click **"Install"** or **"Save"**
</Step>

<Step title="Select repository">
  1. You'll be redirected back to Netlify
  2. Find and click **`ngeshlew/air-fryer-converter`**
</Step>
</Steps>

---

## Step 3: Configure Build Settings (3 minutes)

<Steps>
<Step title="Verify build settings">
  Netlify should auto-detect your Vite app. Verify these settings:
  
  | Setting | Value | Notes |
  |---------|-------|-------|
  | **Branch to deploy** | `main` | ✓ Default is correct |
  | **Base directory** | (leave empty) | ✓ Root of repository |
  | **Build command** | `npm run build` | ✓ Auto-detected |
  | **Publish directory** | `dist` | ✓ Auto-detected for Vite |
  
  <Check>
  If these are already filled in correctly, you're good to go!
  </Check>
</Step>

<Step title="Add environment variables">
  This is the **MOST IMPORTANT** step! Scroll down to **"Environment variables"**.
  
  1. Click **"Add environment variables"** or **"New variable"**
  2. Add this variable:
  
  | Key | Value |
  |-----|-------|
  | `VITE_API_URL` | Your Railway backend URL |
  
  **Example:**
  ```
  Key:   VITE_API_URL
  Value: https://air-fryer-api-production.up.railway.app
  ```
  
  <Warning>
  **CRITICAL:** Use your actual Railway backend URL! Without this, your frontend won't be able to connect to your API.
  
  Make sure:
  - ✓ Starts with `https://` (not `http://`)
  - ✓ No trailing slash
  - ✓ It's your backend service URL, not the PostgreSQL URL
  </Warning>
  
  3. Click **"Add"** to save the variable
</Step>

<Step title="Advanced settings (optional)">
  Expand **"Advanced build settings"** if you need to:
  
  - **Node version**: Add environment variable
    ```
    NODE_VERSION = 18
    ```
  
  <Tip>
  Netlify usually auto-detects the Node version, so this is optional unless you encounter issues.
  </Tip>
</Step>
</Steps>

---

## Step 4: Deploy! (2 minutes)

<Steps>
<Step title="Start deployment">
  1. Click **"Deploy [your-site-name]"** button at the bottom
  2. Netlify will start building your site
  3. You'll see the build logs in real-time
</Step>

<Step title="Wait for build">
  The build process takes 1-3 minutes:
  
  1. **Installing dependencies** - `npm install`
  2. **Building** - `npm run build` (Vite bundling)
  3. **Publishing** - Uploading to Netlify CDN
  4. **Deploy successful** ✅
  
  <Info>
  Watch the logs to ensure no errors occur. Common issues:
  - Missing dependencies → Fixed by npm install
  - TypeScript errors → We already fixed these
  - Environment variable issues → Check VITE_API_URL
  </Info>
</Step>

<Step title="Get your URL">
  Once deployed, you'll see:
  
  ```
  ✨ Your site is live! ✨
  ```
  
  Your URL will be something like:
  ```
  https://cheerful-biscuit-abc123.netlify.app
  ```
  
  <Check>
  Click the URL to open your Air Fryer Converter in production! 🎉
  </Check>
</Step>
</Steps>

---

## Step 5: Update Railway CORS (1 minute)

Now that you have your Netlify URL, update Railway to allow requests from it:

<Steps>
<Step title="Update FRONTEND_URL in Railway">
  1. Go to [Railway Dashboard](https://railway.app/dashboard)
  2. Click your **backend service** (air-fryer-converter)
  3. Go to **"Variables"** tab
  4. Find or add `FRONTEND_URL`
  5. Set it to your Netlify URL:
     ```
     https://your-site-name.netlify.app
     ```
  6. Click **"Save"**
  
  <Info>
  Railway will automatically redeploy with the new CORS settings.
  </Info>
</Step>
</Steps>

---

## Step 6: Set Custom Domain (Optional)

<Steps>
<Step title="Choose your domain approach">
  **Option 1: Use Netlify Subdomain** (Free, Instant)
  - Change from `cheerful-biscuit-abc123.netlify.app`
  - To something like: `airfryer-converter.netlify.app`
  
  **Option 2: Use Custom Domain** (Your own domain)
  - Use your own domain: `airfryer.yourdomain.com`
  - Requires DNS configuration
</Step>

<Step title="Change Netlify subdomain">
  1. Go to **Site settings** → **Domain management**
  2. Under "Production domains", click **"Options"** → **"Edit site name"**
  3. Enter your desired name: `airfryer-converter`
  4. Your site will now be: `https://airfryer-converter.netlify.app`
  
  <Tip>
  Netlify subdomain names are first-come-first-served. Pick something unique!
  </Tip>
</Step>

<Step title="Add custom domain (optional)">
  1. Go to **Site settings** → **Domain management**
  2. Click **"Add custom domain"**
  3. Enter your domain (e.g., `airfryer.yourdomain.com`)
  4. Follow Netlify's DNS instructions:
     - Add CNAME record pointing to your Netlify subdomain
     - Or use Netlify DNS (transfer your domain)
  5. Netlify automatically provisions free SSL certificate ✅
  
  <Info>
  SSL certificate provisioning takes 1-24 hours depending on DNS propagation.
  </Info>
</Step>
</Steps>

---

## 🎉 You're Live!

Your Air Fryer Converter is now deployed on Netlify!

### ✅ What You Have:

- **Frontend**: `https://your-site-name.netlify.app`
- **Backend**: `https://your-backend.up.railway.app`
- **Database**: PostgreSQL on Railway
- **Auto-deploys**: Every push to `main` branch triggers new deploy

### 📊 Test Your Deployment:

1. **Visit your Netlify URL**
2. **Test the Calculator** - Convert an oven recipe
3. **Check Dashboard** - Should load without errors
4. **Open DevTools** - No console errors about API connection
5. **Add a recipe** via Prisma Studio and see it on your site

---

## 🔄 Automatic Deployments

Now every time you push to GitHub:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

**Both Railway and Netlify auto-deploy!** 🚀

- ⏱️ Railway backend: ~2-3 minutes
- ⏱️ Netlify frontend: ~1-2 minutes

---

## 🐛 Troubleshooting

<AccordionGroup>
<Accordion title="Build fails: 'vite' not found">
  **Solution:** Node version issue
  
  1. Go to **Site settings** → **Environment variables**
  2. Add: `NODE_VERSION = 18`
  3. Click **"Deploys"** → **"Trigger deploy"** → **"Deploy site"**
</Accordion>

<Accordion title="Site loads but API errors in console">
  **Solution:** Check VITE_API_URL
  
  1. Go to **Site settings** → **Environment variables**
  2. Verify `VITE_API_URL` is set to your Railway backend URL
  3. Make sure it's `https://` (not `http://`)
  4. No trailing slash
  5. Trigger a new deploy after updating
  
  **Test your backend:**
  ```bash
  curl https://your-backend.up.railway.app/api/health
  ```
</Accordion>

<Accordion title="CORS errors in browser console">
  **Solution:** Update Railway FRONTEND_URL
  
  1. Railway Dashboard → Backend service → Variables
  2. Set `FRONTEND_URL` to your Netlify URL
  3. Or temporarily set to `*` for testing
  4. Save and wait for Railway to redeploy
</Accordion>

<Accordion title="Site shows old version after deploy">
  **Solution:** Clear cache
  
  1. Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
  2. Or clear browser cache
  3. Or try incognito/private window
</Accordion>

<Accordion title="Build succeeds but site shows blank page">
  **Solution:** Check browser console
  
  1. Open DevTools (F12)
  2. Check Console tab for JavaScript errors
  3. Check Network tab for failed requests
  4. Common causes:
     - API URL not set correctly
     - Backend not deployed/running
     - CORS not configured properly
</Accordion>
</AccordionGroup>

---

## 📈 Monitor Your Deployment

### Netlify Dashboard Features:

1. **Deploys**: View build history and logs
2. **Functions**: View serverless function usage (if you add them later)
3. **Analytics**: See visitor stats (paid feature)
4. **Domain Management**: Manage domains and SSL
5. **Build & Deploy**: Configure build settings

### View Deploy Logs:

1. Click **"Deploys"** in top menu
2. Click on latest deploy
3. View full build log to debug issues

---

## 🎯 Next Steps After Deployment

1. **Add Sample Recipes** - Use Prisma Studio to add recipes
2. **Share Your App** - Send URL to friends and family!
3. **Monitor Usage** - Check Netlify bandwidth and build minutes
4. **Set Up Analytics** - Add Google Analytics or Netlify Analytics
5. **Custom Domain** - Point your own domain to Netlify

---

## 📊 Free Tier Limits

**Netlify Free Tier:**
- ✅ 100 GB bandwidth/month
- ✅ 300 build minutes/month
- ✅ Unlimited sites
- ✅ Automatic HTTPS
- ✅ Continuous deployment

**Railway Free Trial:**
- ✅ $5 credit/month
- ⚠️ Requires credit card after trial
- ⚠️ Monitor usage to avoid charges

---

## 🔗 Useful Links

- **Your Site**: https://your-site-name.netlify.app
- **Netlify Dashboard**: https://app.netlify.com/
- **Railway Dashboard**: https://railway.app/dashboard
- **GitHub Repo**: https://github.com/ngeshlew/air-fryer-converter
- **Netlify Docs**: https://docs.netlify.com/

---

**Congratulations! Your Air Fryer Converter is now live on the internet!** 🎉🍗

