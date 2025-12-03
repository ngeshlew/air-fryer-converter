# Seeding Railway Database

Your Railway database is currently empty, which is why you're seeing the "Something went wrong" error on the recipes page.

## Option 1: Seed via Railway CLI (Recommended)

1. Install Railway CLI if you haven't already:
```bash
npm i -g @railway/cli
```

2. Login to Railway:
```bash
railway login
```

3. Link to your project:
```bash
cd server
railway link
```

4. Run the seed command:
```bash
railway run npm run seed
```

## Option 2: Seed from Local with Railway Database

1. Get your Railway PostgreSQL connection string:
   - Go to your Railway project
   - Click on the PostgreSQL service
   - Copy the `DATABASE_URL` from Variables tab

2. Update your local `.env` file temporarily:
```bash
# In server/.env
DATABASE_URL="your-railway-postgres-url-here"
```

3. Run the seed command locally:
```bash
cd server
npm run seed
```

4. Restore your local `.env` to use local database after seeding

## Option 3: Run in Railway Dashboard

1. Go to your Railway project
2. Click on your backend service
3. Go to the "Settings" tab
4. Scroll to "Deploy Triggers"
5. Add a custom start command temporarily: `npm run seed && npm start`
6. Redeploy
7. After deployment, change it back to `npm start`

## Verify the Seed

After seeding, you can verify by:

1. Check Railway logs - you should see:
```
🌱 Starting database seed...
🗑️  Cleared existing recipes
✅ Seeded 20 recipes successfully!
```

2. Visit your app at https://airfryer-converter.netlify.app/recipes
   - You should now see 20 recipes
   - No more errors

## What Gets Seeded

The seed script adds 20 diverse recipes:
- Crispy Air Fryer Chicken Wings (ALDI)
- Air Fryer Salmon with Lemon (Waitrose)
- Vegetable Spring Rolls (Tesco)
- Air Fryer Steak with Garlic Butter (M&S)
- Crispy Air Fryer Chips (ALDI)
- Air Fryer Falafel (Waitrose)
- Air Fryer Bacon (Tesco)
- Stuffed Bell Peppers (M&S)
- Air Fryer Prawns (Waitrose)
- Air Fryer Chocolate Brownies (ALDI)
- And 10 more...

Each recipe includes:
- Complete ingredients list
- Step-by-step instructions
- Prep and cook times
- Difficulty level
- High-quality images from Unsplash
- Tags for easy filtering

## Troubleshooting

### Error: Can't reach database server

**Problem**: Wrong connection string or database not accessible

**Solution**: 
- Make sure you're using the PUBLIC `DATABASE_URL` from Railway PostgreSQL service
- Check if Railway PostgreSQL service is running
- Verify the connection string includes the correct port and SSL parameters

### Error: Table 'Recipe' does not exist

**Problem**: Database migrations haven't been run

**Solution**:
```bash
# First run migrations
railway run npx prisma migrate deploy

# Then seed
railway run npm run seed
```

### Error: Module not found

**Problem**: Dependencies not installed

**Solution**:
```bash
cd server
npm install
railway run npm run seed
```

## After Seeding

Once seeded successfully:
- ✅ Visit https://airfryer-converter.netlify.app/recipes
- ✅ You should see all 20 recipes
- ✅ Filter by supermarket works
- ✅ Recipe details load correctly
- ✅ Calculator still works
- ✅ Recipe of the Day appears on dashboard

The fixes have been deployed:
- ✅ Select dropdown filter fixed (no more empty value error)
- ✅ "View Original" button removed (since URLs are placeholders)
- ✅ All recipes display properly once seeded

## Need Help?

If you encounter any issues:
1. Check Railway logs for errors
2. Verify your DATABASE_URL is correct
3. Make sure Prisma schema is up to date: `railway run npx prisma generate`
4. Check that the PostgreSQL service is running on Railway

