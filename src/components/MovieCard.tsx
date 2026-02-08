'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Plus, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import { Movie } from '@/types';
import { IMAGE_BASE_URL } from '@/lib/tmdb';

interface MovieCardProps {
    movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative min-w-[200px] h-full cursor-pointer transition-transform duration-300 md:min-w-[240px] md:h-[140px] lg:min-w-[280px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img
                src={`${IMAGE_BASE_URL}${movie.backdrop_path || movie.poster_path}`}
                alt={movie.title}
                loading="lazy"
                className={`w-full h-full object-cover rounded-md transition duration-300 block ${isHovered ? 'opacity-0' : 'opacity-100'}`}
            />

            {/* Hover State */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1.15 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2, delay: 0.2 }}
                        className="absolute top-0 left-0 w-full z-50 bg-[#181818] text-white rounded-md shadow-2xl overflow-hidden min-h-[300px] flex flex-col"
                        style={{ width: '100%', height: 'auto' }}
                    >
                        <div className="relative w-full h-36">
                            <img
                                src={`${IMAGE_BASE_URL}${movie.backdrop_path || movie.poster_path}`}
                                alt={movie.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-4 flex flex-col gap-2">
                            <div className="flex items-center gap-2 mb-2">
                                <Link href={`/movie/${movie.id}`} className="bg-white rounded-full p-2 hover:opacity-80 transition cursor-pointer">
                                    <Play className="w-4 h-4 fill-black text-black" />
                                </Link>
                                <button className="border-2 border-gray-400 rounded-full p-2 hover:border-white transition">
                                    <Plus className="w-4 h-4 text-white" />
                                </button>
                                <button className="border-2 border-gray-400 rounded-full p-2 hover:border-white transition ml-auto">
                                    <ThumbsUp className="w-4 h-4 text-white" />
                                </button>
                            </div>

                            <p className="text-green-500 text-xs font-semibold">98% Match</p>
                            <h3 className="text-sm font-bold line-clamp-1">{movie.title || movie.name}</h3>
                            <div className="flex gap-2 text-[10px] text-gray-400 font-bold uppercase">
                                {movie.genre_ids?.slice(0, 3).map(g => <span key={g} className="border border-gray-600 px-1 rounded">{g}</span>)}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
