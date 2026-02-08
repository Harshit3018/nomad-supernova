'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Movie } from '@/types';
import { BASE_URL, API_KEY, IMAGE_BASE_URL } from '@/lib/tmdb';
import Link from 'next/link';

function SearchContent() {
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('q') || '');
    const [results, setResults] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchSearch = async () => {
            if (!query) {
                setResults([]);
                return;
            }
            try {
                const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
                const data = await res.json();
                setResults(data.results || []);
            } catch (error) {
                console.error(error);
            }
        };

        const debounce = setTimeout(() => {
            fetchSearch();
        }, 500);

        return () => clearTimeout(debounce);
    }, [query]);

    return (
        <div className="max-w-4xl mx-auto">
            <input
                type="text"
                placeholder="Search for movies, TV shows..."
                className="w-full bg-[#333] p-4 text-xl rounded text-white focus:outline-none focus:ring-2 focus:ring-red-600 mb-8 placeholder-gray-500"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus={true}
            />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-20">
                {results.filter((m) => m.poster_path).map((movie) => (
                    <Link href={`/movie/${movie.id}`} key={movie.id} className="block group">
                        <div className="relative aspect-[2/3] overflow-hidden rounded bg-neutral-800">
                            <img
                                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                                alt={movie.title || movie.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                loading="lazy"
                            />
                        </div>
                        <p className="mt-2 text-sm text-gray-400 group-hover:text-white transition truncate">{movie.title || movie.name}</p>
                    </Link>
                ))}
            </div>
            {results.length === 0 && query && (
                <p className="text-gray-500 text-center mt-12">No results found for "{query}"</p>
            )}
        </div>
    );
}

export default function SearchPage() {
    return (
        <div className="min-h-screen bg-[#141414] text-white pt-24 px-4 md:px-12">
            <Navbar />
            <Suspense fallback={<div className="text-center text-gray-500">Loading search...</div>}>
                <SearchContent />
            </Suspense>
        </div>
    );
}
