# Recipe Scraping Progress Tracker

This document tracks the progress of scraping recipes from all supermarket sources.

## URLs to Scrape

### Marks & Spencer (M&S)
- ✅ **Collection Page:** `https://www.marksandspencer.com/c/food-and-wine/cooking/collections/1799/air-fryer-recipes/`
- ✅ **Scraper:** Implemented (`MarksAndSpencerScraper.ts`)
- ⏳ **Status:** Ready to scrape
- 📝 **Recipes Found:** TBD
- 📝 **Recipes Added:** TBD

### Waitrose
- ✅ **Air Fryer Page:** `https://www.waitrose.com/ecom/recipes/air-fryer`
- ✅ **All Recipes:** `https://www.waitrose.com/ecom/recipes/all-recipes`
- ✅ **Scraper:** Updated (`WaitroseScraper.ts`)
- ⏳ **Status:** Ready to scrape
- 📝 **Recipes Found:** TBD
- 📝 **Recipes Added:** TBD

### Tesco
- ✅ **Air Fryer Category:** `https://realfood.tesco.com/category/air-fryer.html`
- ✅ **Easy Recipes:** `https://realfood.tesco.com/category/air-fryer/easy-air-fryer-recipes.html`
- ✅ **Vegetarian Recipes:** `https://realfood.tesco.com/category/air-fryer/vegetarian-air-fryer-recipes.html`
- ✅ **Scraper:** Updated (`TescoScraper.ts`)
- ⏳ **Status:** Ready to scrape
- 📝 **Recipes Found:** TBD
- 📝 **Recipes Added:** TBD

### BBC Good Food
- ✅ **Air Fryer Collection:** `https://www.bbc.co.uk/food/collections/air_fryer_recipes`
- ✅ **Scraper:** Implemented (`BBCGoodFoodScraper.ts`)
- ⏳ **Status:** Ready to scrape
- 📝 **Recipes Found:** TBD
- 📝 **Recipes Added:** TBD

### ALDI
- ✅ **Air Fryer Collection:** `https://www.aldi.co.uk/recipes/collections/air-fryer`
- ✅ **Scraper:** Already implemented (`AldiScraper.ts`)
- ⏳ **Status:** Ready to scrape
- 📝 **Recipes Found:** TBD
- 📝 **Recipes Added:** TBD

---

## Scraping Commands

### Scrape All Supermarkets
```bash
cd server
npm run scrape
```

### Scrape Individual Supermarkets
```bash
# ALDI
npm run scrape:aldi

# Waitrose
npm run scrape:waitrose

# Tesco
npm run scrape:tesco

# Marks & Spencer
npm run scrape:ms

# BBC Good Food
npm run scrape:bbc
```

### Via API (Railway)
```bash
# Scrape all
curl -X POST https://your-backend.railway.app/api/scraping/trigger \
  -H "Content-Type: application/json" \
  -d '{"limit": 20}'

# Scrape specific supermarket
curl -X POST https://your-backend.railway.app/api/scraping/trigger \
  -H "Content-Type: application/json" \
  -d '{"supermarket": "ALDI", "limit": 20}'
```

---

## Progress Log

### [Date: TBD] - Initial Scraping Run

#### ALDI
- **URL:** `https://www.aldi.co.uk/recipes/collections/air-fryer`
- **Recipes Found:** TBD
- **Recipes Added:** TBD
- **Images Extracted:** TBD
- **Status:** ⏳ Pending

#### Waitrose
- **URL:** `https://www.waitrose.com/ecom/recipes/air-fryer`
- **Recipes Found:** TBD
- **Recipes Added:** TBD
- **Images Extracted:** TBD
- **Status:** ⏳ Pending

#### Tesco
- **URL:** `https://realfood.tesco.com/category/air-fryer.html`
- **Recipes Found:** TBD
- **Recipes Added:** TBD
- **Images Extracted:** TBD
- **Status:** ⏳ Pending

#### Marks & Spencer
- **URL:** `https://www.marksandspencer.com/c/food-and-wine/cooking/collections/1799/air-fryer-recipes/`
- **Recipes Found:** TBD
- **Recipes Added:** TBD
- **Images Extracted:** TBD
- **Status:** ⏳ Pending

#### BBC Good Food
- **URL:** `https://www.bbc.co.uk/food/collections/air_fryer_recipes`
- **Recipes Found:** TBD
- **Recipes Added:** TBD
- **Images Extracted:** TBD
- **Status:** ⏳ Pending

---

## Notes

- All scrapers extract images from recipe pages
- Rate limiting: 2-3 seconds between requests
- Images are saved with full URLs (relative URLs converted to absolute)
- Failed recipes are logged but don't stop the scraping process
- Each scraper validates recipe data before saving

---

**Last Updated:** December 3, 2024

