# Complete List of Scraper URLs

This document lists all the actual URLs that the web scrapers are configured to scrape from.

## ✅ Implemented Scrapers

### 1. ALDI
**Base URL:** `https://www.aldi.co.uk`

**Primary Collection Page:**
- `https://www.aldi.co.uk/recipes/collections/air-fryer`

**Scraper File:** `server/src/services/scrapers/AldiScraper.ts`

**Status:** ✅ Implemented and ready

---

### 2. Waitrose
**Base URL:** `https://www.waitrose.com`

**Primary Collection Pages:**
- `https://www.waitrose.com/ecom/recipes/air-fryer` ✅ (Primary - Air Fryer specific)
- `https://www.waitrose.com/ecom/recipes/all-recipes` (All recipes - needs filtering)

**Scraper File:** `server/src/services/scrapers/WaitroseScraper.ts`

**Status:** ✅ Updated to use air-fryer specific URL

---

### 3. Tesco
**Base URL:** `https://realfood.tesco.com`

**Primary Collection Pages:**
- `https://realfood.tesco.com/category/air-fryer.html` ✅ (Primary - Air Fryer category)
- `https://realfood.tesco.com/category/air-fryer/easy-air-fryer-recipes.html` (Easy recipes subcategory)
- `https://realfood.tesco.com/category/air-fryer/vegetarian-air-fryer-recipes.html` (Vegetarian subcategory)

**Scraper File:** `server/src/services/scrapers/TescoScraper.ts`

**Status:** ✅ Updated to use air-fryer category URL

---

### 4. Marks & Spencer (M&S)
**Base URL:** `https://www.marksandspencer.com`

**Primary Collection Pages:**
- `https://www.marksandspencer.com/c/food-and-wine/cooking/collections/1799/air-fryer-recipes/` ✅ (Primary - Air Fryer collection)
- `https://www.marksandspencer.com/food/content/what-to-cook-in-an-air-fryer` (Informational page with recipe links)

**Scraper File:** `server/src/services/scrapers/MarksAndSpencerScraper.ts`

**Status:** ✅ Newly implemented

---

### 5. BBC Good Food
**Base URL:** `https://www.bbc.co.uk`

**Primary Collection Page:**
- `https://www.bbc.co.uk/food/collections/air_fryer_recipes` ✅ (Primary - Air Fryer collection)

**Scraper File:** `server/src/services/scrapers/BBCGoodFoodScraper.ts`

**Status:** ✅ Newly implemented

---

## 📋 All URLs to Scrape (From User Request)

### Marks & Spencer
1. ✅ `https://www.marksandspencer.com/food/content/what-to-cook-in-an-air-fryer` (Informational - links to recipes)
2. ✅ `https://www.marksandspencer.com/c/food-and-wine/cooking/recipes/air-fryer-recipes/` (Recipe listing)
3. ✅ `https://www.marksandspencer.com/c/food-and-wine/cooking/collections/1799/air-fryer-recipes/` (Collection - PRIMARY)

### Waitrose
1. ✅ `https://www.waitrose.com/ecom/recipes/air-fryer?srsltid=AfmBOorBlQ7I8kSRUAsJFYfR3cF5kwa-VGs3RB6XUHa81oce5giNkl9i&sortBy=A_2_Z` (Air Fryer recipes - PRIMARY)
2. ✅ `https://www.waitrose.com/ecom/recipes/all-recipes` (All recipes - needs filtering)

### Tesco
1. ✅ `https://realfood.tesco.com/category/air-fryer/easy-air-fryer-recipes.html?page=2` (Easy recipes - page 2)
2. ✅ `https://realfood.tesco.com/category/air-fryer.html` (Main category - PRIMARY)
3. ✅ `https://realfood.tesco.com/category/air-fryer/vegetarian-air-fryer-recipes.html` (Vegetarian subcategory)

### BBC Good Food
1. ✅ `https://www.bbc.co.uk/food/collections/air_fryer_recipes` (Air Fryer collection - PRIMARY)

### ALDI
1. ✅ `https://www.aldi.co.uk/recipes/collections/air-fryer` (Air Fryer collection - PRIMARY)

---

## 🚀 How to Run Scraping

### Local Development
```bash
cd server

# Scrape all supermarkets
npm run scrape

# Scrape individual supermarkets
npm run scrape:aldi
npm run scrape:waitrose
npm run scrape:tesco
npm run scrape:ms
npm run scrape:bbc
```

### Via API (Railway/Production)
```bash
# Scrape all supermarkets
curl -X POST https://your-backend.railway.app/api/scraping/trigger \
  -H "Content-Type: application/json" \
  -d '{"limit": 20}'

# Scrape specific supermarket
curl -X POST https://your-backend.railway.app/api/scraping/trigger \
  -H "Content-Type: application/json" \
  -d '{"supermarket": "ALDI", "limit": 20}'
```

---

## 📊 Scraper Features

All scrapers:
- ✅ Extract recipe titles, descriptions, ingredients, instructions
- ✅ Extract images from recipe pages (full URLs)
- ✅ Parse prep time, cook time, servings, difficulty
- ✅ Extract tags automatically
- ✅ Handle rate limiting (2-3 second delays)
- ✅ Validate recipe data before saving
- ✅ Skip duplicate recipes (by sourceUrl)
- ✅ Log scraping progress and errors

---

## 📝 Notes

1. **Puppeteer Requirement:** All scrapers use Puppeteer for browser automation, which requires Chrome/Chromium to be installed.

2. **Railway Setup:** For Railway deployment, you may need to add a Puppeteer buildpack or configure Chrome installation.

3. **Rate Limiting:** Scrapers include delays between requests to be respectful to target websites.

4. **Image Extraction:** Images are extracted directly from recipe pages, ensuring high-quality recipe images.

5. **Error Handling:** Failed recipes are logged but don't stop the scraping process.

---

**Last Updated:** December 3, 2024

