'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Bell, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (pathname === '/login' || pathname === '/signup') return null;

    return (
        <header
            className={cn(
                'fixed top-0 z-50 w-full transition-all duration-300 px-4 md:px-12 py-4 flex items-center justify-between',
                isScrolled ? 'bg-black/95 shadow-lg backdrop-blur-sm' : 'bg-transparent bg-gradient-to-b from-black/80 to-transparent'
            )}
        >
            <div className="flex items-center space-x-8">
                <Link href="/">
                    <h1 className="text-red-600 text-3xl font-bold cursor-pointer tracking-wider">NOMAD</h1>
                </Link>
                <nav className="hidden md:flex space-x-6 text-sm text-gray-300 font-medium">
                    <Link href="/" className="hover:text-white transition">Home</Link>
                    <Link href="#" className="hover:text-white transition">TV Shows</Link>
                    <Link href="#" className="hover:text-white transition">Movies</Link>
                    <Link href="#" className="hover:text-white transition">New & Popular</Link>
                    <Link href="#" className="hover:text-white transition">My List</Link>
                </nav>
            </div>

            <div className="flex items-center space-x-6 text-white">
                <Link href="/search">
                    <Search className="w-5 h-5 cursor-pointer hover:text-gray-300 transition" />
                </Link>
                <span className="hidden md:block text-sm font-medium cursor-pointer">KIDS</span>
                <Bell className="w-5 h-5 cursor-pointer hover:text-gray-300 transition" />
                <Link href="/login" className="flex items-center gap-2 cursor-pointer">
                    <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center overflow-hidden">
                        <User className="w-5 h-5" />
                    </div>
                </Link>
            </div>
        </header>
    );
}
