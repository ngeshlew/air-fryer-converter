# Fix Railway Backend Domain Issue

## Problem

Frontend at https://airfryer-converter.netlify.app/ is getting 404 errors when trying to reach the backend API.

## Solution

### Step 1: Generate Railway Public Domain

1. **Go to [Railway Dashboard](https://railway.app/dashboard)**
2. **Click your `air-fryer-converter` service** (the backend Node.js service)
3. **Go to Settings** (gear icon)
4. **Scroll to "Networking" section**
5. **Click "Generate Domain"**
6. **Copy the generated URL** - it will look like:
   ```
   https://air-fryer-converter-production-xxxx.up.railway.app
   ```

### Step 2: Update Netlify Environment Variable

1. **Go to [Netlify Dashboard](https://app.netlify.com/)**
2. **Click your `airfryer-converter` site**
3. **Go to Site settings → Environment variables**
4. **Find `VITE_API_URL`**
5. **Update it to your Railway backend URL**:
   ```
   https://air-fryer-converter-production-xxxx.up.railway.app
   ```
   **Important:** 
   - ✅ Use `https://` (not `http://`)
   - ✅ NO trailing slash
   - ✅ This should be the Railway backend domain you just generated

6. **Save the variable**

### Step 3: Trigger Netlify Redeploy

1. **In Netlify, go to "Deploys" tab**
2. **Click "Trigger deploy" → "Deploy site"**
3. **Wait 2-3 minutes** for the new build

### Step 4: Update Railway CORS

1. **Go back to Railway Dashboard**
2. **Click your backend service**
3. **Go to "Variables" tab**
4. **Find or add `FRONTEND_URL`**
5. **Set it to:**
   ```
   https://airfryer-converter.netlify.app
   ```
6. **Save** - Railway will auto-redeploy

## Quick Test

After both redeploy, test your backend API directly:

```bash
curl https://your-railway-url.up.railway.app/api/health
```

You should see:
```json
{
  "status": "healthy",
  "timestamp": "...",
  "database": "connected"
}
```

## What Was Wrong?

1. **Railway backend had no public domain** - it was only accessible internally
2. **Netlify was trying to reach a URL that didn't exist** - resulting in 404 errors
3. **Double slash in path** (`//api/health`) might indicate URL misconfiguration

## Expected Result

After these fixes:
- ✅ Frontend can reach backend API
- ✅ Health check passes
- ✅ Calculator works
- ✅ Dashboard loads
- ✅ No 404 errors

---

**Time to fix:** 5 minutes  
**Both services need to redeploy:** Yes (automatic)

