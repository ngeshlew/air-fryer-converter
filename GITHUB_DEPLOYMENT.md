# Deploy Air Fryer Converter via GitHub

Your code is now on GitHub! This guide shows you how to deploy your app by connecting your GitHub repository to Railway (backend) and Netlify (frontend).

## 🔗 Repository

**GitHub URL**: https://github.com/ngeshlew/air-fryer-converter

---

## Part 1: Deploy Backend to Railway (5 minutes)

<Steps>
<Step title="Add backend service from GitHub">
  1. Go to your [Railway dashboard](https://railway.app/dashboard)
  2. Click on your existing project (the one with PostgreSQL)
  3. Click **"New Service"**
  4. Select **"GitHub Repo"**
  5. Authorize Railway to access your GitHub if prompted
  6. Select **`ngeshlew/air-fryer-converter`** repository
</Step>

<Step title="Configure service settings">
  Railway will auto-detect Node.js. Now configure it:
  
  1. Click on your new service (three dots → Settings)
  2. **Service Name**: Enter `air-fryer-api`
  3. **Root Directory**: Enter `server`
  4. **Start Command**: `npm start`
  5. **Build Command**: Leave empty (uses package.json scripts)
  6. Click **"Save"**
</Step>

<Step title="Link PostgreSQL database">
  1. Still in your service settings, scroll to **"Service Variables"**
  2. Click **"New Variable"** → **"Add Reference"**
  3. Select your **PostgreSQL** service
  4. Choose **`DATABASE_URL`**
  5. Railway will automatically inject the connection string
</Step>

<Step title="Add environment variables">
  In the "Variables" tab, add these variables:
  
  | Variable | Value |
  |----------|-------|
  | `NODE_ENV` | `production` |
  | `PORT` | `3001` |
  | `FRONTEND_URL` | `*` (we'll update this after deploying frontend) |
  
  <Tip>
  The `FRONTEND_URL` can be set to `*` initially, then updated to your Netlify URL for better security.
  </Tip>
</Step>

<Step title="Deploy backend">
  1. Railway will auto-deploy when you save variables
  2. Wait 2-3 minutes for build to complete
  3. Once deployed, click **"Settings"** → **"Networking"**
  4. Click **"Generate Domain"**
  5. Copy your backend URL (e.g., `https://air-fryer-api.up.railway.app`)
  
  <Check>
  Test your API: Visit `https://your-service.up.railway.app/health`
  
  You should see:
  ```json
  {
    "status": "ok",
    "database": "connected"
  }
  ```
  </Check>
</Step>

<Step title="Run database migrations">
  Since this is the first deployment, you need to create the database tables:
  
  1. In Railway, click your **backend service**
  2. Go to **"Settings"** → **"Deploy"**
  3. Click **"Custom Build Command"** and enter:
     ```bash
     npm install && npx prisma generate && npx prisma migrate deploy && npm run build
     ```
  4. Redeploy the service
  
  <Warning>
  This will create your production database tables. Only needed once!
  </Warning>
</Step>
</Steps>

---

## Part 2: Deploy Frontend to Netlify (5 minutes)

<Steps>
<Step title="Create Netlify account">
  1. Go to [Netlify.com](https://www.netlify.com/)
  2. Click **"Sign up"**
  3. Choose **"GitHub"** to sign up
  4. Authorize Netlify to access your GitHub
</Step>

<Step title="Import project from GitHub">
  1. From Netlify dashboard, click **"Add new site"** → **"Import an existing project"**
  2. Choose **"Deploy with GitHub"**
  3. Select **`ngeshlew/air-fryer-converter`** repository
  4. Netlify will detect it's a Vite app automatically
</Step>

<Step title="Configure build settings">
  Netlify should auto-detect these settings. Verify:
  
  | Setting | Value |
  |---------|-------|
  | **Base directory** | (leave empty - root of repo) |
  | **Build command** | `npm run build` |
  | **Publish directory** | `dist` |
  | **Node version** | `18` or higher |
  
  <Tip>
  If Node version isn't set, add an environment variable:
  `NODE_VERSION` = `18`
  </Tip>
</Step>

<Step title="Add environment variable for API">
  1. Scroll down to **"Environment variables"**
  2. Click **"Add environment variables"**
  3. Add this variable:
  
  | Key | Value |
  |-----|-------|
  | `VITE_API_URL` | Your Railway backend URL (e.g., `https://air-fryer-api.up.railway.app`) |
  
  <Warning>
  Make sure to use your actual Railway backend URL from Part 1, Step 5!
  </Warning>
</Step>

<Step title="Deploy frontend">
  1. Click **"Deploy air-fryer-converter"**
  2. Wait 2-3 minutes for build to complete
  3. Once deployed, you'll get a URL like: `https://cheerful-biscuit-abc123.netlify.app`
  
  <Check>
  Visit your Netlify URL - your Air Fryer Converter should be live! 🎉
  </Check>
</Step>

<Step title="Set up custom domain (Optional)">
  1. In Netlify, go to **"Site settings"** → **"Domain management"**
  2. Click **"Add custom domain"**
  3. Enter your domain (e.g., `airfryer.yourdomain.com`)
  4. Follow DNS setup instructions
  5. Netlify provides free SSL automatically
</Step>
</Steps>

---

## Part 3: Update CORS Settings (1 minute)

Now that you have your frontend URL, update Railway backend to allow requests from it:

<Steps>
<Step title="Update FRONTEND_URL in Railway">
  1. Go to Railway dashboard
  2. Click your **backend service**
  3. Go to **"Variables"** tab
  4. Find `FRONTEND_URL` and update it to your Netlify URL:
     ```
     https://your-app-name.netlify.app
     ```
  5. Click **"Save"** - Railway will auto-redeploy
</Step>
</Steps>

---

## 🎯 Your Deployed App

After completing all steps, you'll have:

✅ **Frontend**: `https://your-app-name.netlify.app`  
✅ **Backend API**: `https://air-fryer-api.up.railway.app`  
✅ **Database**: PostgreSQL on Railway  
✅ **GitHub**: Auto-deploy on push to `main`

---

## 🔄 Automatic Deployments

Both Railway and Netlify are now connected to your GitHub repo:

- **Push to `main` branch** → Both services auto-deploy
- **View deploy logs** in Railway/Netlify dashboards
- **Roll back** easily from deployment history

### To deploy changes:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

Both Railway and Netlify will automatically detect the push and redeploy! 🚀

---

## 📊 Post-Deployment Tasks

<AccordionGroup>
<Accordion title="Add sample recipes to production database">
  **Option 1: Use Prisma Studio** (Recommended)
  ```bash
  # Set DATABASE_URL to your Railway URL
  export DATABASE_URL="your-railway-postgres-url"
  
  cd server
  npx prisma studio
  ```
  
  **Option 2: Railway SQL Query**
  1. Go to Railway → PostgreSQL service
  2. Click "Query" tab
  3. Run the sample recipe SQL from RAILWAY_SETUP.md
</Accordion>

<Accordion title="Monitor your app">
  **Railway Monitoring:**
  - View logs: Railway Dashboard → Service → Logs
  - Check metrics: CPU, memory, requests
  - Set up alerts for errors
  
  **Netlify Monitoring:**
  - View build logs: Deploys → Click latest deploy
  - Analytics: Site overview (free tier limited)
  - Form submissions (if you add forms later)
</Accordion>

<Accordion title="Set up custom domain">
  **For Netlify:**
  1. Site settings → Domain management
  2. Add custom domain
  3. Update DNS records with your provider
  
  **For Railway:**
  1. Service settings → Networking
  2. Custom Domain → Add domain
  3. Add CNAME record: `your-api.yourdomain.com` → Railway URL
</Accordion>
</AccordionGroup>

---

## 🐛 Troubleshooting

<AccordionGroup>
<Accordion title="Railway build failing">
  **Common issues:**
  - ✓ Check `Root Directory` is set to `server`
  - ✓ Verify `DATABASE_URL` is linked from PostgreSQL
  - ✓ Check build logs for specific errors
  - ✓ Ensure `package.json` includes all dependencies
  
  **Fix:**
  ```bash
  # Run locally first to test
  cd server
  npm install
  npm run build
  ```
</Accordion>

<Accordion title="Netlify build failing">
  **Common issues:**
  - ✓ Check `VITE_API_URL` is set correctly
  - ✓ Verify Node version (needs 18+)
  - ✓ Build command is `npm run build`
  - ✓ Publish directory is `dist`
  
  **Fix:**
  Add environment variable: `NODE_VERSION = 18`
</Accordion>

<Accordion title="Frontend can't reach backend (CORS error)">
  **Check:**
  - ✓ `VITE_API_URL` in Netlify matches Railway backend URL
  - ✓ `FRONTEND_URL` in Railway matches Netlify frontend URL
  - ✓ Both use `https://` (not `http://`)
  
  **Temporary fix for testing:**
  Set `FRONTEND_URL=*` in Railway (allows all origins)
</Accordion>

<Accordion title="Database connection errors">
  **Verify:**
  - ✓ PostgreSQL service is running in Railway
  - ✓ `DATABASE_URL` is correctly linked to backend service
  - ✓ Migrations have been run (`npx prisma migrate deploy`)
  
  **Reset database:**
  ```bash
  # Connect to your Railway DB
  export DATABASE_URL="your-railway-url"
  
  # Reset and migrate
  npx prisma migrate reset
  npx prisma migrate deploy
  ```
</Accordion>
</AccordionGroup>

---

## 📈 Next Steps

Now that your app is deployed:

1. **Add recipes** - Use Prisma Studio or build the web scraper
2. **Share your app** - Send the Netlify URL to friends/family
3. **Monitor usage** - Check Railway/Netlify dashboards
4. **Iterate** - Make changes, push to GitHub, auto-deploys! 🎉

---

## 🔗 Useful Links

- **GitHub Repo**: https://github.com/ngeshlew/air-fryer-converter
- **Railway Dashboard**: https://railway.app/dashboard
- **Netlify Dashboard**: https://app.netlify.com/
- **Prisma Docs**: https://www.prisma.io/docs/
- **Railway Docs**: https://docs.railway.app/
- **Netlify Docs**: https://docs.netlify.com/

---

**Congratulations!** 🎉 Your Air Fryer Converter is now live and deployed! Both services will automatically deploy when you push changes to GitHub.

