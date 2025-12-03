# 🍳 Air Fryer Converter

A modern web application for converting oven cooking instructions to air fryer settings and discovering UK supermarket air fryer recipes.

## Features

- **Oven to Air Fryer Calculator**: Convert temperature and cooking time from oven to air fryer settings
- **Recipe Browser**: Browse air fryer recipes from UK supermarkets (ALDI, Waitrose, Tesco, M&S, etc.)
- **Recipe of the Day**: Featured daily recipe on the dashboard
- **Conversion Tips**: Helpful tips for air fryer cooking
- **Responsive Design**: Works on desktop, tablet, and mobile

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

## Deployment

### Frontend (Netlify)
- Build command: `npm install && npm run build`
- Publish directory: `dist`
- Environment variable: `VITE_API_URL`

### Backend (Railway)
- Build command: `cd server && npm install && npx prisma generate && npm run build`
- Start command: `cd server && npm start`
- Environment variables: `DATABASE_URL`, `PORT`, `NODE_ENV`

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

## Acknowledgments

- Inspired by timezoneworldclock.com
- Based on the Fuel Tracker project architecture

