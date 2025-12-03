# Web Scraping Implementation Guide

## Overview

The Air Fryer Converter includes a comprehensive web scraping system to automatically collect recipes from UK supermarkets. The system is built with:

- **Puppeteer** for browser automation
- **Rate limiting** to be respectful to source websites
- **Error handling** and retry logic
- **Automated cron jobs** for daily scraping
- **Logging** for monitoring and debugging

## Architecture

### Base Scraper (`BaseScraper.ts`)

Abstract class providing common functionality:
- Browser initialization and cleanup
- Navigation with retry logic
- Time/servings/difficulty parsing
- Text cleaning and normalization
- Tag extraction
- Rate limiting delays

### Supermarket Scrapers

Each supermarket has its own scraper extending `BaseScraper`:

1. **ALDI Scraper** (`AldiScraper.ts`)
   - Scrapes: `https://www.aldi.co.uk/recipes`
   - Extracts: Title, description, ingredients, instructions, metadata

2. **Waitrose Scraper** (`WaitroseScraper.ts`)
   - Scrapes: `https://www.waitrose.com/ecom/recipes`
   - Extracts: Full recipe details with images

3. **Tesco Scraper** (`TescoScraper.ts`)
   - Scrapes: `https://realfood.tesco.com/recipes`
   - Extracts: Recipe data from Tesco Real Food

### Scraping Service (`scraping.service.ts`)

Coordinates all scrapers:
- Manages scraping state (running/idle)
- Handles rate limiting between supermarkets
- Saves recipes to database (creates new or updates existing)
- Tracks scraping logs and statistics
- Provides status and history APIs

## API Endpoints

### Trigger Scraping

```bash
POST /api/scraping/trigger
Content-Type: application/json

{
  "supermarket": "ALDI",  // Optional: specific supermarket
  "limit": 10              // Optional: recipes per supermarket (default: 10)
}
```

**Response:**
```json
{
  "success": true,
  "message": "Scraping started for ALDI"
}
```

### Get Scraping Status

```bash
GET /api/scraping/status
```

**Response:**
```json
{
  "success": true,
  "data": {
    "isRunning": false,
    "totalRecipes": 45,
    "totalFailed": 3,
    "totalRuns": 5,
    "lastRun": "2024-01-15T02:00:00.000Z",
    "bySupermarket": [...]
  }
}
```

### Get Scraping Logs

```bash
GET /api/scraping/logs?limit=50
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "supermarket": "ALDI",
      "status": "COMPLETED",
      "recipesScraped": 10,
      "recipesFailed": 0,
      "createdAt": "...",
      "completedAt": "..."
    }
  ]
}
```

## Automated Scraping

### Cron Schedule

The system runs automated scraping daily at 2:00 AM:

```typescript
// Runs every day at 2 AM
cron.schedule('0 2 * * *', async () => {
  await scrapingService.scrapeAll(15); // 15 recipes per supermarket
});
```

### Enabling Cron Jobs

Set environment variable in Railway:

```bash
ENABLE_SCRAPING_CRON=true
```

**Note:** Keep this `false` during development to avoid unnecessary scraping.

## Rate Limiting

The system implements multiple layers of rate limiting:

1. **Between pages**: 2 seconds delay
2. **Between recipes**: 2 seconds delay  
3. **Between supermarkets**: 3 seconds delay

This ensures we're respectful to source websites and avoid being blocked.

## Error Handling

### Retry Logic

- Navigation retries: 3 attempts with exponential backoff
- Failed recipes are logged but don't stop the entire scrape
- Errors are captured in scraping logs

### Logging

All scraping activities are logged:
- Start/completion of scraping runs
- Individual recipe successes/failures
- Error details for debugging

## Database Schema

### Recipe Model

Scraped recipes are saved with:
- Title, description, image URL
- Prep time, cook time, servings
- Difficulty level
- Ingredients (array)
- Instructions (array)
- Tags (array)
- Source URL and supermarket

### Scraping Log Model

Tracks scraping history:
- Supermarket
- Status (IN_PROGRESS, COMPLETED, FAILED)
- Recipes scraped/failed counts
- Error messages
- Timestamps

## Testing Scrapers

### Manual Trigger

Use the API endpoint to test:

```bash
curl -X POST http://localhost:3001/api/scraping/trigger \
  -H "Content-Type: application/json" \
  -d '{"supermarket": "ALDI", "limit": 5}'
```

### Run Immediately (Development)

```typescript
import { runScrapingNow } from './cron/scrapingJobs';

await runScrapingNow(); // Scrapes 5 recipes per supermarket
```

## Deployment to Railway

### Environment Variables

Add to Railway service:

```bash
# Required
DATABASE_URL=postgresql://...

# Optional - Enable cron jobs
ENABLE_SCRAPING_CRON=true

# Optional - Node environment
NODE_ENV=production
```

### Build Command

Railway automatically runs:
```bash
npm install
npx prisma generate
npm run build
```

### Start Command

```bash
npm start
```

## Legal & Ethical Considerations

### Robots.txt Compliance

Always check `robots.txt` before scraping:
- `https://www.aldi.co.uk/robots.txt`
- `https://www.waitrose.com/robots.txt`
- `https://realfood.tesco.com/robots.txt`

### Best Practices

1. **Rate Limiting**: Implemented (2-3 second delays)
2. **User Agent**: Set to identify as a browser
3. **Respect Terms of Service**: Review each site's ToS
4. **Attribution**: Always link back to source URL
5. **No Commercial Use**: Recipes are for personal/educational use
6. **Update Frequency**: Daily scraping is reasonable
7. **Error Handling**: Don't hammer servers on errors

### Attribution

All recipes include:
- `sourceUrl`: Link to original recipe
- `supermarket`: Source supermarket
- Displayed on recipe detail pages

## Monitoring

### Check Scraping Health

```bash
# Get status
curl http://localhost:3001/api/scraping/status

# View recent logs
curl http://localhost:3001/api/scraping/logs?limit=10
```

### Railway Logs

Monitor scraping in Railway dashboard:
- View real-time logs
- Check for errors
- Monitor resource usage

## Troubleshooting

### Scraper Fails to Start

**Issue**: Browser won't launch
**Solution**: Puppeteer args are configured for Railway's environment

### No Recipes Found

**Issue**: Website structure changed
**Solution**: Update selectors in specific scraper

### Rate Limited/Blocked

**Issue**: Too many requests
**Solution**: Increase delays in `BaseScraper`

### Memory Issues

**Issue**: Puppeteer uses lots of memory
**Solution**: 
- Reduce concurrent scrapers
- Lower `limit` parameter
- Ensure browser cleanup

## Future Enhancements

- [ ] Add more supermarkets (M&S, BBC Good Food, Happy Foodie)
- [ ] Implement image downloading and hosting
- [ ] Add recipe deduplication logic
- [ ] Create admin dashboard for monitoring
- [ ] Add webhook notifications for scraping completion
- [ ] Implement incremental scraping (only new recipes)
- [ ] Add recipe quality scoring
- [ ] Support for recipe updates (detect changes)

## Summary

The web scraping system is production-ready with:

✅ 3 supermarket scrapers (ALDI, Waitrose, Tesco)
✅ Rate limiting and error handling
✅ Automated daily scraping via cron
✅ Comprehensive logging and monitoring
✅ API endpoints for manual triggering
✅ Database seed with 20 sample recipes

**Status**: Ready for deployment to Railway! 🚀

