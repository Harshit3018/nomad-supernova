'use client';
import { useState, useEffect } from 'react';
import { Play, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Movie, Trailer } from '@/types';
import { fetchMovieVideos, IMAGE_BASE_URL } from '@/lib/tmdb';
import Modal from './Modal';
import Link from 'next/link';

interface HeroProps {
    movie: Movie | null;
}

export default function Hero({ movie }: HeroProps) {
    const [trailer, setTrailer] = useState<string | null>(null);
    const [isTrailerOpen, setIsTrailerOpen] = useState(false);

    useEffect(() => {
        if (movie) {
            fetchMovieVideos(movie.id).then((videos: Trailer[]) => {
                const officialTrailer = videos.find(v => v.type === 'Trailer' && v.site === 'YouTube');
                if (officialTrailer) {
                    setTrailer(officialTrailer.key);
                }
            });
        }
    }, [movie]);

    if (!movie) return (
        <div className="h-[70vh] bg-neutral-900 flex items-center justify-center text-white" style={{ minHeight: '50vh', backgroundColor: '#333' }}>
            <div className="text-center p-8 bg-black/50 rounded-lg backdrop-blur-sm border border-red-500">
                <h2 className="text-2xl font-bold mb-2 text-red-500">Video Unavailable</h2>
                <p className="text-gray-300 mb-4">Nomad could not load movie data.</p>
                <p className="text-sm text-gray-500 font-mono bg-black p-2 rounded">
                    Tip: Ensure NEXT_PUBLIC_TMDB_API_KEY is set in Vercel.
                </p>
            </div>
        </div>
    );

    return (
        <div className="relative h-[85vh] w-full text-white">
            {/* Background Image */}
            <div className="absolute top-0 left-0 w-full h-[95vh] -z-10">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent z-10" />
                <img
                    src={`${IMAGE_BASE_URL}${movie.backdrop_path || movie.poster_path}`}
                    alt={movie.title || movie.name}
                    className="w-full h-full object-cover object-top opacity-80"
                />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center h-full px-4 md:px-12 pt-20 max-w-2xl relative z-20 space-y-4">
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-extrabold drop-shadow-lg leading-tight"
                >
                    {movie.title || movie.name}
                </motion.h1>

                <p className="text-green-400 font-semibold text-sm md:text-base">
                    {movie.vote_average * 10}% Match <span className="text-gray-300 ml-2">{movie.release_date?.split('-')[0]}</span>
                </p>

                <p className="text-gray-200 text-sm md:text-lg line-clamp-3 drop-shadow-md max-w-xl">
                    {movie.overview}
                </p>

                <div className="flex space-x-3 mt-4">
                    <button
                        onClick={() => setIsTrailerOpen(true)}
                        disabled={!trailer}
                        className="flex items-center px-6 py-2 bg-white text-black rounded hover:bg-gray-200 transition font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Play className="w-5 h-5 mr-2 fill-black" />
                        Play Trailer
                    </button>
                    <Link href={`/movie/${movie.id}`}>
                        <button className="flex items-center px-6 py-2 bg-gray-500/70 text-white rounded hover:bg-gray-500/50 transition font-bold backdrop-blur-sm">
                            <Info className="w-5 h-5 mr-2" />
                            More Info
                        </button>
                    </Link>
                </div>
            </div>

            {/* Trailer Modal */}
            <Modal isOpen={isTrailerOpen} onClose={() => setIsTrailerOpen(false)}>
                {trailer && (
                    <div className="relative pt-[56.25%] w-full h-full bg-black">
                        <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src={`https://www.youtube.com/embed/${trailer}?autoplay=1&rel=0&showinfo=0`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                )}
            </Modal>

            {/* Fade at bottom */}
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#141414] to-transparent z-10" />
        </div>
    );
}
