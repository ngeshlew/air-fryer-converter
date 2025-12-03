# Image Scraping Improvements

## Summary

All scrapers have been updated to extract actual recipe images directly from the source websites instead of relying on placeholder Unsplash URLs.

## Verification Results

Ran `npm run check:images` and found:
- **65 recipes** currently in database
- **All 65 recipes** use Unsplash placeholder URLs
- **0 recipes** have actual source website images

## Improvements Made

### 1. Enhanced Image Extraction Logic

All scrapers now use improved image extraction with:

#### Priority-Based Selector Strategy
1. Recipe-specific images (`img[src*="recipe"]`, `img[alt*="recipe"]`)
2. Hero images (`[class*="hero"] img`)
3. Recipe image containers (`[class*="recipe-image"] img`)
4. Article/main content images (`article img`, `main img`)
5. Picture elements (`picture img`)

#### Image Quality Filtering
- Filters out data URIs (base64 images)
- Filters out images smaller than 200px width
- Prioritizes larger, higher-quality images

#### URL Normalization
- Converts relative URLs to absolute URLs
- Removes query parameters to get full-size images
- Ensures proper domain prefixes

### 2. Updated Scrapers

#### ALDI Scraper (`AldiScraper.ts`)
- Enhanced image extraction for ALDI recipe pages
- Handles ALDI-specific image structures
- Base URL: `https://www.aldi.co.uk`

#### Waitrose Scraper (`WaitroseScraper.ts`)
- Improved image detection for Waitrose recipes
- Handles Waitrose image formats
- Base URL: `https://www.waitrose.com`

#### Tesco Scraper (`TescoScraper.ts`)
- Better image extraction for Tesco Real Food
- Handles Tesco-specific layouts
- Base URL: `https://realfood.tesco.com`

#### Marks & Spencer Scraper (`MarksAndSpencerScraper.ts`)
- Enhanced image detection for M&S recipes
- Handles product/recipe image structures
- Base URL: `https://www.marksandspencer.com`

#### BBC Good Food Scraper (`BBCGoodFoodScraper.ts`)
- Improved image extraction for BBC Food recipes
- Handles BBC recipe page layouts
- Base URL: `https://www.bbc.co.uk`

### 3. Frontend Error Handling

- Added image error handling to `RecipeDetail.tsx`
- Shows fallback emoji (🍳) when images fail to load
- Displays "Image unavailable" message
- Prevents broken image placeholders

## Next Steps

### To Update Existing Recipes with Real Images

1. **Run Scraping for Each Supermarket:**
   ```bash
   cd server
   npm run scrape:aldi
   npm run scrape:waitrose
   npm run scrape:tesco
   npm run scrape:ms
   npm run scrape:bbc
   ```

2. **Or Scrape All at Once:**
   ```bash
   npm run scrape
   ```

3. **Verify Images:**
   ```bash
   npm run check:images
   ```

### Expected Results

After scraping:
- Recipes will have actual images from source websites
- Images will be full-size (query parameters removed)
- Higher quality images (>200px width)
- Proper absolute URLs

### Notes

- Scraping may take time (2-3 seconds per recipe + delays)
- Some recipes may not have images available on source sites
- Failed image extractions will result in `null` imageUrl
- Frontend will show fallback for missing images

## Testing

To test image extraction:

1. Run scraper for a single supermarket:
   ```bash
   npm run scrape:aldi
   ```

2. Check database for updated image URLs:
   ```bash
   npm run prisma:studio
   ```

3. Verify images load correctly on frontend

## Troubleshooting

### If Images Still Don't Load:

1. **Check Image URLs in Database:**
   - Verify URLs are absolute (start with `https://`)
   - Check if URLs are accessible
   - Ensure no CORS restrictions

2. **Check Scraper Logs:**
   - Look for image extraction warnings
   - Verify selectors are finding images
   - Check if images are being filtered out

3. **Test Image URLs Manually:**
   - Copy image URL from database
   - Open in browser to verify accessibility
   - Check for redirects or authentication requirements

---

**Last Updated:** December 3, 2024

