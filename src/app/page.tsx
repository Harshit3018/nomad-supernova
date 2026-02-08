import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Row from '@/components/Row';
import requests, { fetchMovieDetails, fetchMovieVideos } from '@/lib/tmdb';
import { Movie } from '@/types';

// Server Component for fetching random movie
async function getHeroMovie() {
  // Fetch "Trending"
  try {
    const res = await fetch(`https://api.themoviedb.org/3${requests.fetchTrending}`);
    const data = await res.json();
    const movies = data.results;
    const randomMovie = movies[Math.floor(Math.random() * movies.length)];
    return randomMovie;
  } catch (error) {
    return null;
  }
}

export default async function Home() {
  const heroMovie: Movie | null = await getHeroMovie();

  return (
    <main className="relative bg-[#141414] min-h-screen text-white overflow-x-hidden">
      <Navbar />
      <Hero movie={heroMovie} />

      <section className="flex flex-col space-y-2 md:space-y-4 -mt-24 md:-mt-48 z-30 relative pl-4 md:pl-12 pb-24">
        <Row title="Trending Now" fetchUrl={requests.fetchTrending} isLargeRow />
        <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
        <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
        <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
        <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
        <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
        <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
      </section>
    </main>
  );
}
