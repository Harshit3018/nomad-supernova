import { fetchMovieDetails, fetchMovieVideos, fetchSimilarMovies, IMAGE_BASE_URL } from '@/lib/tmdb';
import { getAvailability } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Modal from '@/components/Modal';
import { Play, Star, Plus, Share2, AlertCircle } from 'lucide-react';
import { Availability, Movie, Trailer } from '@/types';
import Link from 'next/link';

export default async function MovieDetail({ params }: { params: { id: string } }) {
    const { id } = await params;

    const movie: Movie = await fetchMovieDetails(id);
    const videos: Trailer[] = await fetchMovieVideos(id);
    const similarMovies: Movie[] = await fetchSimilarMovies(id);
    const availability: Availability = getAvailability(id, movie?.title || movie?.name || "");

    if (!movie) return <div className="text-white text-center mt-20">Movie not found</div>;

    const trailerKey = videos.find(v => v.type === "Trailer" && v.site === "YouTube")?.key;

    return (
        <div className="bg-[#141414] min-h-screen text-white relative">
            <Navbar />

            {/* Background */}
            <div className="absolute top-0 left-0 w-full h-[70vh] -z-10 bg-gradient-to-t from-[#141414] via-[#141414]/80 to-transparent">
                <img
                    src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover opacity-50 absolute top-0 left-0 -z-20"
                />
                <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#141414] to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-32 flex flex-col md:flex-row gap-8">
                {/* Left: Poster */}
                <div className="flex-shrink-0 w-full md:w-[300px] lg:w-[350px]">
                    <img
                        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-auto rounded-lg shadow-2xl"
                    />
                </div>

                {/* Right: Info */}
                <div className="flex-1 space-y-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold">{movie.title || movie.name}</h1>

                    <div className="flex items-center gap-4 text-sm md:text-base text-gray-300">
                        <span className="text-green-500 font-bold">{Math.round(movie.vote_average * 10)}% Match</span>
                        <span>{movie.release_date?.split("-")[0]}</span>
                        <span className="border border-gray-500 px-1 rounded text-xs uppercase">{movie.media_type || "Movie"}</span>
                        <span>{movie.genre_ids?.join(" • ")}</span> {/* Ideally fetch genre names */}
                    </div>

                    <p className="text-lg text-gray-200 leading-relaxed max-w-3xl">
                        {movie.overview}
                    </p>

                    <div className="flex flex-wrap gap-4 py-4">
                        {/* Platform Links */}
                        <a href={availability.netflixUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#E50914] text-white px-6 py-3 rounded hover:bg-[#b00710] transition font-bold">
                            <Play className="w-5 h-5 fill-current" /> Watch on Netflix
                        </a>
                        <a href={availability.primeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#00A8E1] text-white px-6 py-3 rounded hover:bg-[#007EA8] transition font-bold">
                            <Play className="w-5 h-5 fill-current" /> Watch on Prime
                        </a>
                        {/* MX Player */}
                        <a href={availability.mxPlayerUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#3A5CAA] text-white px-6 py-3 rounded hover:bg-[#2b4480] transition font-bold">
                            <Play className="w-5 h-5 fill-current" /> Watch on MX Player
                        </a>

                        {/* External Free */}
                        {availability.externalFreeUrl && (
                            <div className="flex flex-col gap-2">
                                <a href={availability.externalFreeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gray-700 text-white px-6 py-3 rounded hover:bg-gray-600 transition font-bold border border-gray-500">
                                    <Play className="w-5 h-5 fill-current" /> Watch via External Site
                                </a>
                                <div className="flex items-start gap-1 text-xs text-gray-400 max-w-xs">
                                    <AlertCircle className="w-3 h-3 flex-shrink-0 mt-0.5" />
                                    <span>Disclaimer: External link. We do not host or verify content. Proceed at your own risk.</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-4 pt-4 border-t border-gray-800">
                        <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition">
                            <Plus className="w-6 h-6" />
                            <span className="text-xs">My List</span>
                        </button>
                        <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition">
                            <Share2 className="w-6 h-6" />
                            <span className="text-xs">Share</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Trailer Section */}
            {trailerKey && (
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
                    <h2 className="text-2xl font-bold mb-6 border-l-4 border-red-600 pl-4">Official Trailer</h2>
                    <div className="aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg border border-gray-800">
                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${trailerKey}`}
                            title="YouTube video player"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}

            {/* Similar Movies */}
            <div className="px-4 md:px-12 py-12">
                <h2 className="text-2xl font-bold mb-6 text-gray-200">More Like This</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {similarMovies.slice(0, 6).map((sim) => (
                        <Link href={`/movie/${sim.id}`} key={sim.id} className="block group">
                            <div className="relative aspect-[2/3] rounded overflow-hidden">
                                <img
                                    src={`${IMAGE_BASE_URL}${sim.poster_path}`}
                                    alt={sim.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                    <Play className="w-12 h-12 text-white bg-red-600 rounded-full p-3 shadow-lg" />
                                </div>
                            </div>
                            <p className="mt-2 text-sm text-gray-300 font-medium truncate">{sim.title}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
