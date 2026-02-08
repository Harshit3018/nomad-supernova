# NOMAD - OTT Aggregator

A Netflix-style OTT aggregation platform built with Next.js 15, Tailwind CSS, and TMDB API.

## Features

- **Netflix-inspired UI**: Dark mode, horizontal scrolling rows, hero banner with video background support.
- **Aggregation**: Redirects to Netflix, Prime Video, MX Player, and external sites.
- **Trailer Support**: Watch trailers directly within the app using YouTube embeds.
- **Search**: Real-time search for movies and TV shows.
- **Responsive**: Fully optimized for mobile and desktop.

## Setup

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Environment Variables**:
   Copy `.env.local.example` to `.env.local` and add your TMDB API Key.
   ```
   NEXT_PUBLIC_TMDB_API_KEY=your_key_here
   ```
4. **Run the development server**:
   ```bash
   npm run dev
   ```

## Tech Stack

- **Frontend**: Next.js (App Router), React, Tailwind CSS, Framer Motion
- **Data**: TMDB API (The Movie Database)
- **Icons**: Lucide React

## Disclaimer

This project is for educational purposes only. It does not host any copyrighted content. All external links are provided as-is.
