-- CreateEnum
CREATE TYPE "Supermarket" AS ENUM ('ALDI', 'WAITROSE', 'MARKS_AND_SPENCER', 'TESCO', 'BBC_GOOD_FOOD', 'HAPPY_FOODIE');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "ScrapingStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "recipes" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image_url" TEXT,
    "source_url" TEXT NOT NULL,
    "supermarket" "Supermarket" NOT NULL,
    "cook_time" INTEGER,
    "prep_time" INTEGER,
    "difficulty" "Difficulty",
    "servings" INTEGER,
    "ingredients" JSONB NOT NULL,
    "instructions" JSONB NOT NULL,
    "tags" TEXT[],
    "scraped_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_updated" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "recipes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scraping_logs" (
    "id" TEXT NOT NULL,
    "supermarket" "Supermarket" NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),
    "status" "ScrapingStatus" NOT NULL,
    "recipes_found" INTEGER NOT NULL DEFAULT 0,
    "recipes_added" INTEGER NOT NULL DEFAULT 0,
    "recipes_updated" INTEGER NOT NULL DEFAULT 0,
    "error_message" TEXT,

    CONSTRAINT "scraping_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "recipes_source_url_key" ON "recipes"("source_url");

-- CreateIndex
CREATE INDEX "recipes_supermarket_idx" ON "recipes"("supermarket");

-- CreateIndex
CREATE INDEX "recipes_is_featured_idx" ON "recipes"("is_featured");

-- CreateIndex
CREATE INDEX "recipes_is_active_idx" ON "recipes"("is_active");

-- CreateIndex
CREATE INDEX "recipes_scraped_at_idx" ON "recipes"("scraped_at");

-- CreateIndex
CREATE INDEX "scraping_logs_supermarket_idx" ON "scraping_logs"("supermarket");

-- CreateIndex
CREATE INDEX "scraping_logs_status_idx" ON "scraping_logs"("status");

-- CreateIndex
CREATE INDEX "scraping_logs_started_at_idx" ON "scraping_logs"("started_at");
