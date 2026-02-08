'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Signup() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Signing up with', email, password);
        router.push('/login');
    };

    return (
        <div className="relative w-full h-screen bg-black text-white">
            <div className="absolute top-0 left-0 w-full z-10 p-6 flex items-center justify-between">
                <Link href="/">
                    <h1 className="text-red-600 text-4xl font-bold">NOMAD</h1>
                </Link>
                <Link href="/login" className="text-white hover:underline font-bold">Sign In</Link>
            </div>

            <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Unlimited movies, TV <br /> shows, and more.</h1>
                <p className="text-xl md:text-2xl mb-4">Watch anywhere. Cancel anytime.</p>
                <p className="text-lg md:text-xl mb-6">Ready to watch? Enter your email to create or restart your membership.</p>

                <form onSubmit={handleSignup} className="flex flex-col md:flex-row gap-4 w-full max-w-3xl">
                    <input
                        type="email"
                        placeholder="Email address"
                        className="flex-1 p-4 bg-black/40 border border-gray-500 rounded text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-1 focus:ring-white"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Create Password"
                        className="flex-1 p-4 bg-black/40 border border-gray-500 rounded text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-1 focus:ring-white"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="bg-red-600 px-8 py-4 text-xl font-bold rounded hover:bg-red-700 transition flex items-center justify-center whitespace-nowrap">
                        Get Started &gt;
                    </button>
                </form>
            </div>

            <div className="absolute bottom-0 w-full p-8 border-t border-gray-800 bg-black/80 text-gray-500 text-sm">
                <p>Questions? Call 000-800-040-1843</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <span>FAQ</span>
                    <span>Help Center</span>
                    <span>Account</span>
                    <span>Media Center</span>
                </div>
            </div>
        </div>
    );
}
