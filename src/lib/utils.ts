import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// "Mock" Database for Availability
const availabilityDB: Record<string, { netflix?: boolean; prime?: boolean; mx?: boolean; free?: string }> = {
    // Examples:
    '550': { netflix: true, prime: true }, // Fight Club
    '123': { netflix: false, prime: false, mx: true, free: 'https://archive.org/details/some-movie' },
};

export const getAvailability = (id: string | number, title: string) => {
    const dbEntry = availabilityDB[String(id)];

    // Default fallback URLs (Standard Search Links)
    const netflixSearch = `https://www.netflix.com/search?q=${encodeURIComponent(title)}`;
    const primeSearch = `https://www.amazon.com/s?k=${encodeURIComponent(title)}&i=instant-video`;
    const mxSearch = `https://www.mxplayer.in/search?q=${encodeURIComponent(title)}`;

    // External "Free" site links - purely educational references
    const externalFree = dbEntry?.free || `https://google.com/search?q=${encodeURIComponent(title + " watch online free")}`;

    return {
        netflixUrl: dbEntry?.netflix ? `https://www.netflix.com/watch/${id}` : netflixSearch,
        primeUrl: dbEntry?.prime ? `https://www.amazon.com/gp/video/detail/${id}` : primeSearch,
        mxPlayerUrl: dbEntry?.mx ? `https://www.mxplayer.in/movie/${id}` : mxSearch,
        externalFreeUrl: externalFree,
        isFree: !!dbEntry?.free,
    };
};
