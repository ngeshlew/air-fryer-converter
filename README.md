# 🍳 Air Fryer Converter

A modern, full-stack web application for converting oven cooking instructions to air fryer settings and discovering recipes from UK supermarkets.

**🎯 Live Demo:** Ready for deployment to Railway + Netlify!

## ✨ Features

### 🧮 Oven to Air Fryer Calculator
- Convert oven temperature and time to air fryer settings
- Preset temperatures (140-220°C) or custom input
- Automatic calculations (reduces temp by 20°C, time by 20%)
- Smart tips: when to check food, browning adjustments
- Input validation and error handling

### 📖 Recipe Browser
- Browse recipes from UK supermarkets (ALDI, Waitrose, Tesco, M&S, BBC Good Food, Happy Foodie)
- Filter by supermarket
- Search by recipe name
- Detailed recipe view with ingredients and instructions
- Recipe of the Day on dashboard

### 🎨 Modern UI/UX
- Animated sidebar (desktop) that collapses
- Bottom navigation (mobile)
- Light/dark/system themes
- Responsive design (mobile-first)
- Loading states and smooth animations
- IBM Plex Mono font for technical aesthetic

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite
- Tailwind CSS + Shadcn UI
- Zustand for state management
- React Router
- IBM Plex Mono font

### Backend
- Node.js + Express.js
- Prisma ORM + PostgreSQL
- Cheerio/Puppeteer for web scraping
- Node-Cron for scheduled jobs

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/air-fryer-converter.git
cd air-fryer-converter
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd server
npm install
```

4. Set up environment variables:
```bash
# Copy .env.example to .env and update values
cp .env.example .env
cd server
cp .env.example .env
```

5. Set up the database:
```bash
cd server
npx prisma migrate dev
npx prisma generate
```

### Development

1. Start the backend:
```bash
cd server
npm run dev
```

2. In a new terminal, start the frontend:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

## 🚀 Deployment

**See [DEPLOYMENT.md](DEPLOYMENT.md) for complete step-by-step deployment guide.**

### Quick Start

**Backend (Railway):**
1. Connect GitHub repo to Railway
2. Add PostgreSQL database
3. Run `npx prisma migrate deploy`
4. Set environment variables

**Frontend (Netlify):**
1. Connect GitHub repo to Netlify
2. Set build command: `npm install && npm run build`
3. Set publish directory: `dist`
4. Add `VITE_API_URL` environment variable

**Full instructions in [DEPLOYMENT.md](DEPLOYMENT.md)**

## Project Structure

```
air-fryer-converter/
├── src/                    # Frontend source code
│   ├── components/        # React components
│   ├── store/            # Zustand stores
│   ├── services/         # API services
│   ├── utils/            # Utility functions
│   └── types/            # TypeScript types
├── server/               # Backend source code
│   ├── src/
│   │   ├── routes/      # Express routes
│   │   ├── services/    # Business logic
│   │   └── utils/       # Backend utilities
│   └── prisma/          # Database schema
└── public/              # Static assets
```

## License

MIT

## 📊 Project Status

**Implementation:** 7/8 Todos Complete ✅

- ✅ Project Setup & Structure
- ✅ Database Schema (Prisma + PostgreSQL)
- ✅ Backend API (Express + TypeScript)
- ✅ Calculator Component
- ✅ Dashboard Layout
- ✅ Recipe Browser
- ⏳ Web Scraping (pending - can use manual data)
- ✅ Deployment Documentation

See [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) for detailed status and [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md) for progress tracking.

## 📚 Documentation

- **[README.md](README.md)** - This file, project overview
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Complete deployment guide for Railway + Netlify
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Feature list, tech stack, future enhancements
- **[IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md)** - Development progress tracker

## 🤝 Contributing

Contributions welcome! Areas needing help:
- Web scraping implementation (see `server/src/services/scrapers/`)
- Additional recipe sources
- UI/UX improvements
- Test coverage
- Documentation

## 🙏 Acknowledgments

- **Fuel Tracker** project for architecture inspiration
- **Shadcn UI** for beautiful components
- **timezoneworldclock.com** for design inspiration
- **UK Supermarkets** for recipe content

