# Quick Start Guide - Air Fryer Converter

Get your Air Fryer Converter running locally in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- Git installed
- Railway account (free tier available)

## Setup Steps

### 1. Set Up Railway PostgreSQL (2 minutes)

<Steps>
<Step title="Create database">
  1. Go to [Railway.app](https://railway.app/)
  2. Sign in with GitHub
  3. Click "New Project" → "Provision PostgreSQL"
  4. Wait for deployment (~30 seconds)
</Step>

<Step title="Get connection string">
  1. Click on your PostgreSQL service
  2. Go to "Variables" tab
  3. Copy the `DATABASE_URL` value
  4. It looks like: `postgresql://postgres:PASSWORD@containers-us-west-XX.railway.app:PORT/railway`
</Step>
</Steps>

### 2. Configure Backend (1 minute)

```bash
cd server

# Create .env file and add your Railway DATABASE_URL
# Edit server/.env and replace YOUR_PASSWORD and connection details
```

Your `server/.env` should look like:

```bash
DATABASE_URL="postgresql://postgres:ACTUAL_PASSWORD@containers-us-west-XX.railway.app:7654/railway"
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 3. Install & Setup Backend (2 minutes)

```bash
# Still in server directory
npm install

# Generate Prisma client
npm run prisma:generate

# Create database tables
npx prisma migrate dev --name init

# Start backend server
npm run dev
```

<Check>
Server running at `http://localhost:3001`  
Test health check: `http://localhost:3001/health`
</Check>

### 4. Install & Start Frontend (1 minute)

Open a **new terminal**:

```bash
cd /Users/lewinimu/Documents/GitHub/air-fryer-converter

npm install

npm run dev
```

<Check>
Frontend running at `http://localhost:5173`  
Open in browser to see your app!
</Check>

## What You'll See

✅ **Calculator Page** - Convert oven recipes to air fryer settings  
✅ **Dashboard** - Recipe of the day, tips, and stats  
✅ **Browse Recipes** - Filter by supermarket (empty until you add recipes)  
✅ **Settings** - Toggle theme and customize

## Add Sample Recipe

<Tabs>
<Tab title="Prisma Studio (Easiest)">
  ```bash
  cd server
  npm run prisma:studio
  ```
  
  Opens at `http://localhost:5555`
  
  1. Click "Recipe" model
  2. Click "Add record"
  3. Fill in fields:
     - title: "ALDI Air Fryer Chicken"
     - sourceUrl: "https://aldi.co.uk/recipes/sample"
     - supermarket: "ALDI"
     - ingredients: `["500g chicken", "2 tbsp oil"]`
     - instructions: `["Cook at 180C for 25 min"]`
     - cookTime: 25
     - difficulty: "EASY"
  4. Click "Save"
</Tab>

<Tab title="Railway SQL Query">
  1. Go to Railway dashboard
  2. Click PostgreSQL service
  3. Click "Data" tab
  4. Run this SQL:
  
  ```sql
  INSERT INTO recipes (
    id, title, source_url, supermarket,
    ingredients, instructions, cook_time, difficulty
  ) VALUES (
    'sample-1',
    'ALDI Air Fryer Chicken',
    'https://aldi.co.uk/recipes/sample',
    'ALDI',
    '["500g chicken", "2 tbsp oil"]'::jsonb,
    '["Cook at 180C for 25 min"]'::jsonb,
    25,
    'EASY'
  );
  ```
</Tab>
</Tabs>

## Troubleshooting

<AccordionGroup>
<Accordion title="Port 3001 already in use">
  ```bash
  # Find and kill the process
  lsof -ti:3001 | xargs kill -9
  
  # Or change PORT in server/.env
  PORT=3002
  ```
</Accordion>

<Accordion title="Cannot connect to database">
  - Check `DATABASE_URL` in `server/.env` is correct
  - Verify Railway PostgreSQL is running
  - Try copying DATABASE_URL again from Railway
</Accordion>

<Accordion title="Frontend can't reach backend">
  - Ensure backend is running on port 3001
  - Check `VITE_API_URL` in frontend (default: http://localhost:3001)
  - Look at browser console for CORS errors
</Accordion>
</AccordionGroup>

## Next Steps

🚀 **Deploy to Production**: See [DEPLOYMENT.md](DEPLOYMENT.md)  
📊 **Add More Recipes**: Use Prisma Studio or build the web scraper  
🎨 **Customize**: Edit components in `src/components/`  
🔧 **Configure**: Check settings in dashboard

## Useful Commands

### Backend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run prisma:studio # Open database GUI
npx prisma migrate dev # Run database migrations
```

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## File Structure Reference

```
air-fryer-converter/
├── src/              # Frontend React components
│   ├── components/   # All UI components
│   ├── lib/         # Utilities and stores
│   └── pages/       # Page components
├── server/          # Backend Express API
│   ├── src/
│   │   ├── routes/  # API endpoints
│   │   └── services/ # Business logic
│   └── prisma/      # Database schema
└── docs/            # Documentation
```

---

**Happy Cooking!** 🍗 Need help? Check [RAILWAY_SETUP.md](RAILWAY_SETUP.md) for detailed Railway instructions.

