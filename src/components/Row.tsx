'use client';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';
import { Movie } from '@/types';
import { BASE_URL } from '@/lib/tmdb';

interface RowProps {
    title: string;
    fetchUrl: string;
    isLargeRow?: boolean;
}

export default function Row({ title, fetchUrl, isLargeRow }: RowProps) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const rowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const request = await axios.get(`${BASE_URL}${fetchUrl}`);
                setMovies(request.data.results);
            } catch (error) {
                console.error('Error fetching row data:', error);
            }
        }
        fetchData();
    }, [fetchUrl]);

    const slide = (offset: number) => {
        if (rowRef.current) {
            rowRef.current.scrollLeft += offset;
        }
    };

    return (
        <div className="space-y-0.5 md:space-y-2 px-4 md:px-12 my-8 text-white relative group">
            <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
                {title}
            </h2>

            <div className="relative group md:-ml-2">
                <ChevronLeft
                    className="absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 bg-black/50 rounded-full p-2"
                    onClick={() => slide(-500)}
                />

                <div
                    ref={rowRef}
                    className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2"
                >
                    {movies.map((movie) => (
                        <div key={movie.id} className="relative min-w-[180px] md:min-w-[260px] cursor-pointer transition flex-shrink-0 group/card">
                            {/* 
                  Using simple img here rather than MovieCard for the row to avoid nesting hover issues for now.
                  We can upgrade to full MovieCard if needed, but the row scrolling logic + card hover logic can conflict.
                  Let's just use a simple card first.
                */}
                            <img
                                src={`https://image.tmdb.org/t/p/w500${isLargeRow ? movie.poster_path : movie.backdrop_path || movie.poster_path}`}
                                alt={movie.title || movie.name}
                                className="rounded-sm object-cover md:rounded w-full h-auto hover:scale-105 transition duration-200"
                                loading="lazy"
                                onClick={() => window.location.href = `/movie/${movie.id}`}
                            />
                        </div>
                    ))}
                </div>

                <ChevronRight
                    className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 bg-black/50 rounded-full p-2"
                    onClick={() => slide(500)}
                />
            </div>
        </div>
    );
}
