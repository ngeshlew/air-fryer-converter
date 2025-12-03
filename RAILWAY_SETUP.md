# Railway PostgreSQL Setup Guide

This guide will walk you through setting up a PostgreSQL database on Railway for your Air Fryer Converter app.

## Step 1: Create Railway Account & Project

<Steps>
<Step title="Sign up for Railway">
  1. Go to [Railway.app](https://railway.app/)
  2. Click "Login" and sign in with your GitHub account
  3. Authorize Railway to access your GitHub
</Step>

<Step title="Create a new project">
  1. Click "New Project" from your Railway dashboard
  2. Select "Provision PostgreSQL"
  3. Railway will automatically create a PostgreSQL database for you
</Step>
</Steps>

## Step 2: Get Your Database Connection String

<Steps>
<Step title="Access database settings">
  1. Click on your PostgreSQL service in Railway
  2. Go to the "Variables" tab
  3. You'll see several database variables listed
</Step>

<Step title="Copy the DATABASE_URL">
  Find the `DATABASE_URL` variable. It will look like this:
  
  ```
  postgresql://postgres:PASSWORD@containers-us-west-123.railway.app:7654/railway
  ```
  
  Copy this entire URL - you'll need it for both local development and deployment.
</Step>
</Steps>

## Step 3: Configure Local Development

<Steps>
<Step title="Update your .env file">
  In your `server/.env` file, replace the DATABASE_URL with your Railway PostgreSQL URL:
  
  ```bash
  # Replace this with your Railway PostgreSQL URL
  DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@containers-us-west-XX.railway.app:PORT/railway"
  
  # Server Configuration
  PORT=3001
  NODE_ENV=development
  
  # CORS Configuration
  FRONTEND_URL=http://localhost:5173
  ```
  
  <Warning>
  Never commit your `.env` file to git! It's already in `.gitignore`.
  </Warning>
</Step>

<Step title="Install dependencies">
  ```bash
  cd server
  npm install
  ```
</Step>

<Step title="Generate Prisma Client">
  ```bash
  npm run prisma:generate
  ```
  
  This creates the Prisma client based on your schema.
</Step>

<Step title="Run database migrations">
  ```bash
  npx prisma migrate dev --name init
  ```
  
  This creates your database tables on Railway PostgreSQL.
  
  <Check>
  You should see: "Your database is now in sync with your schema."
  </Check>
</Step>
</Steps>

## Step 4: Start Your Local Server

```bash
npm run dev
```

Your server should now be running on `http://localhost:3001` and connected to Railway PostgreSQL!

<Check>
Visit `http://localhost:3001/health` - you should see:
```json
{
  "status": "ok",
  "timestamp": "2024-12-03T...",
  "database": "connected"
}
```
</Check>

## Step 5: Seed Sample Data (Optional)

<Steps>
<Step title="Access Prisma Studio">
  ```bash
  npm run prisma:studio
  ```
  
  This opens a web interface at `http://localhost:5555` where you can manually add recipes.
</Step>

<Step title="Or use SQL to add sample recipes">
  1. Go to your Railway PostgreSQL service
  2. Click on the "Data" tab
  3. Click "Query" to open SQL editor
  4. Run this SQL to add a sample recipe:
  
  ```sql
  INSERT INTO recipes (
    id,
    title,
    description,
    image_url,
    source_url,
    supermarket,
    cook_time,
    prep_time,
    difficulty,
    servings,
    ingredients,
    instructions,
    tags,
    is_featured
  ) VALUES (
    'sample-' || substr(md5(random()::text), 1, 20),
    'ALDI Air Fryer Chicken',
    'Crispy air fryer chicken perfect for a quick weeknight dinner',
    'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58',
    'https://www.aldi.co.uk/recipes/sample-chicken',
    'ALDI',
    25,
    10,
    'EASY',
    4,
    '["500g chicken breast", "2 tbsp olive oil", "1 tsp paprika", "Salt and pepper"]'::jsonb,
    '["Preheat air fryer to 180°C", "Season chicken with oil and spices", "Cook for 25 minutes, flipping halfway"]'::jsonb,
    ARRAY['quick', 'budget-friendly', 'protein'],
    true
  );
  ```
</Step>
</Steps>

## Step 6: Deploy Backend to Railway

<Steps>
<Step title="Create backend service">
  1. In your Railway project, click "New Service"
  2. Select "GitHub Repo"
  3. Choose your `air-fryer-converter` repository
  4. Railway will detect it's a Node.js project
</Step>

<Step title="Configure root directory">
  1. Click on your service settings (gear icon)
  2. Set **Root Directory** to `server`
  3. Set **Start Command** to `npm start`
  4. Set **Build Command** to `npm install && npm run prisma:generate && npm run build`
</Step>

<Step title="Link database to backend">
  1. Click on your backend service
  2. Go to "Variables" tab
  3. Click "New Variable" → "Add Reference"
  4. Select your PostgreSQL service
  5. Choose `DATABASE_URL`
  6. Railway automatically injects the connection string
</Step>

<Step title="Add additional environment variables">
  Add these variables to your backend service:
  
  - `NODE_ENV` = `production`
  - `FRONTEND_URL` = `https://your-app-name.netlify.app` (you'll get this after deploying frontend)
  - `PORT` = `3001` (optional, Railway auto-assigns)
</Step>

<Step title="Deploy">
  1. Click "Deploy"
  2. Wait for build to complete (~2-3 minutes)
  3. Your API will be live at: `https://your-service.up.railway.app`
  
  <Check>
  Test your API: Visit `https://your-service.up.railway.app/health`
  </Check>
</Step>
</Steps>

## Troubleshooting

<AccordionGroup>
<Accordion title="Cannot connect to database locally">
  - Verify your `DATABASE_URL` is correct in `.env`
  - Check if Railway PostgreSQL service is running
  - Ensure your IP is allowed (Railway PostgreSQL is publicly accessible by default)
  - Try restarting your local server
</Accordion>

<Accordion title="Prisma migrations failing">
  ```bash
  # Reset your database (WARNING: Deletes all data)
  npx prisma migrate reset
  
  # Then run migrations again
  npx prisma migrate dev --name init
  ```
</Accordion>

<Accordion title="Railway deployment failing">
  - Check build logs in Railway dashboard
  - Verify `Root Directory` is set to `server`
  - Ensure `DATABASE_URL` is linked from PostgreSQL service
  - Check that all dependencies are in `package.json`
</Accordion>
</AccordionGroup>

## Database Management

### View Data
```bash
# Open Prisma Studio locally
npm run prisma:studio
```

### Backup Database
```bash
# Export data from Railway
pg_dump YOUR_DATABASE_URL > backup.sql
```

### View Logs
- In Railway dashboard, click your PostgreSQL service
- Go to "Deployments" tab to see query logs

## Next Steps

✅ PostgreSQL database running on Railway  
✅ Local development connected to Railway DB  
✅ Ready to deploy backend to Railway  

Now you can:
1. Add sample recipes via Prisma Studio
2. Test your API endpoints locally
3. Deploy frontend to Netlify (see DEPLOYMENT.md)
4. Connect frontend to your Railway backend URL

---

**Need help?** Check the [Railway documentation](https://docs.railway.app/) or [Prisma documentation](https://www.prisma.io/docs/).

