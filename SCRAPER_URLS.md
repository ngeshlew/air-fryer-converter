# Web Scraper URLs Configuration

This document lists all the URLs that the web scrapers are configured to scrape from for each supermarket.

## Currently Implemented Scrapers

### 1. ALDI Scraper
**Base URL:** `https://www.aldi.co.uk`

**Recipe Collection Page:**
- **URL:** `https://www.aldi.co.uk/recipes/collections/air-fryer`
- **Purpose:** Lists all Air Fryer recipes
- **Scrapes:** Individual recipe URLs from this collection page

**Example Recipe URLs:**
- `https://www.aldi.co.uk/recipes/collections/air-fryer/air-fryer-banana-chips`
- `https://www.aldi.co.uk/recipes/collections/air-fryer/air-fryer-crispy-prawn-toast-bites`
- `https://www.aldi.co.uk/recipes/collections/air-fryer/air-fryer-roast-potatoes`
- `https://www.aldi.co.uk/recipes/collections/air-fryer/mini-chicken-kievs`
- `https://www.aldi.co.uk/recipes/collections/air-fryer/air-fryer-beef-lasagne`
- `https://www.aldi.co.uk/recipes/collections/air-fryer/air-fryer-donut-bites`

**File:** `server/src/services/scrapers/AldiScraper.ts`

---

### 2. Waitrose Scraper
**Base URL:** `https://www.waitrose.com`

**Recipe Collection Page:**
- **URL:** `https://www.waitrose.com/ecom/recipes`
- **Purpose:** Lists all recipes (needs filtering for air fryer recipes)
- **Scrapes:** Individual recipe URLs from this page

**Note:** This scraper currently scrapes from the general recipes page. To filter for air fryer recipes specifically, you may need to:
- Add search/filter parameters: `https://www.waitrose.com/ecom/recipes?q=air+fryer`
- Or navigate to a specific air fryer collection if available

**File:** `server/src/services/scrapers/WaitroseScraper.ts`

---

### 3. Tesco Scraper
**Base URL:** `https://realfood.tesco.com`

**Recipe Collection Page:**
- **URL:** `https://realfood.tesco.com/recipes`
- **Purpose:** Lists all recipes from Tesco Real Food
- **Scrapes:** Individual recipe URLs from this page

**Note:** Similar to Waitrose, this scrapes from the general recipes page. For air fryer-specific recipes:
- Search URL: `https://realfood.tesco.com/recipes?q=air+fryer`
- Or filter by category if available

**File:** `server/src/services/scrapers/TescoScraper.ts`

---

## Not Yet Implemented (But Recipes Exist in Database)

### 4. Marks & Spencer (M&S)
**Base URL:** `https://www.marksandspencer.com`

**Potential Recipe URLs:**
- General recipes: `https://www.marksandspencer.com/recipes`
- Search for air fryer: `https://www.marksandspencer.com/recipes?q=air+fryer`

**Status:** ❌ Scraper not implemented yet
**Recipes in Database:** 12 recipes (manually seeded)

---

### 5. BBC Good Food
**Base URL:** `https://www.bbcgoodfood.com`

**Potential Recipe URLs:**
- General recipes: `https://www.bbcgoodfood.com/recipes`
- Air fryer collection: `https://www.bbcgoodfood.com/recipes/collection/air-fryer-recipes`
- Search: `https://www.bbcgoodfood.com/recipes/search?q=air+fryer`

**Status:** ❌ Scraper not implemented yet
**Recipes in Database:** 5 recipes (manually seeded)

---

### 6. The Happy Foodie
**Base URL:** `https://www.thehappyfoodie.co.uk`

**Potential Recipe URLs:**
- General recipes: `https://www.thehappyfoodie.co.uk/recipes`
- Search: `https://www.thehappyfoodie.co.uk/recipes?q=air+fryer`

**Status:** ❌ Scraper not implemented yet
**Recipes in Database:** 5 recipes (manually seeded)

---

## Summary

### Implemented Scrapers (3/6)
1. ✅ **ALDI** - `https://www.aldi.co.uk/recipes/collections/air-fryer`
2. ✅ **Waitrose** - `https://www.waitrose.com/ecom/recipes`
3. ✅ **Tesco** - `https://realfood.tesco.com/recipes`

### Pending Scrapers (3/6)
4. ❌ **Marks & Spencer** - Needs scraper implementation
5. ❌ **BBC Good Food** - Needs scraper implementation
6. ❌ **The Happy Foodie** - Needs scraper implementation

---

## Recommended URLs for Pending Scrapers

### Marks & Spencer
```
Base: https://www.marksandspencer.com
Collection: https://www.marksandspencer.com/recipes
Search: https://www.marksandspencer.com/recipes?q=air+fryer
```

### BBC Good Food
```
Base: https://www.bbcgoodfood.com
Collection: https://www.bbcgoodfood.com/recipes/collection/air-fryer-recipes
Search: https://www.bbcgoodfood.com/recipes/search?q=air+fryer
```

### The Happy Foodie
```
Base: https://www.thehappyfoodie.co.uk
Collection: https://www.thehappyfoodie.co.uk/recipes
Search: https://www.thehappyfoodie.co.uk/recipes?q=air+fryer
```

---

## Notes

1. **ALDI** has a dedicated Air Fryer collection page, making it the easiest to scrape
2. **Waitrose** and **Tesco** scrapers need filtering/search to find air fryer recipes specifically
3. **M&S, BBC Good Food, and The Happy Foodie** scrapers need to be implemented
4. All scrapers use Puppeteer for browser automation
5. Rate limiting is implemented (2-3 second delays between requests)
6. Images are extracted from individual recipe pages

---

## Example Recipe URLs from Each Source

### ALDI
- `https://www.aldi.co.uk/recipes/collections/air-fryer/air-fryer-banana-chips`
- `https://www.aldi.co.uk/recipes/collections/air-fryer/air-fryer-crispy-prawn-toast-bites`

### Waitrose
- `https://www.waitrose.com/ecom/recipes/air-fryer-lemon-garlic-chicken`
- `https://www.waitrose.com/ecom/recipes/mediterranean-air-fried-lamb`

### Tesco
- `https://realfood.tesco.com/recipes/crispy-chicken-corn-mash`
- `https://realfood.tesco.com/recipes/air-fryer-gnocchi-lasagne`

---

**Last Updated:** December 3, 2024

