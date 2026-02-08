export const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p/original';

const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

export default requests;

export const fetchMovieVideos = async (id: string | number) => {
    if (!API_KEY) return [];
    try {
        const res = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`);
        const data = await res.json();
        return data.results;
    } catch (error) {
        console.error('Failed to fetch videos', error);
        return [];
    }
};

export const fetchMovieDetails = async (id: string | number) => {
    if (!API_KEY) return null;
    try {
        const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);
        return await res.json();
    } catch (error) {
        console.error('Failed to fetch movie details', error);
        return null;
    }
};

export const fetchSimilarMovies = async (id: string | number) => {
    if (!API_KEY) return [];
    try {
        const res = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`);
        const data = await res.json();
        return data.results;
    } catch (error) {
        console.error('Failed to fetch similar movies', error);
        return [];
    }
};
