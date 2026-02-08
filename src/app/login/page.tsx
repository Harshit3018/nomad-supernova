'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Use Firebase Auth here
        console.log('Logging in with', email, password);
        // Simulate login success
        router.push('/');
    };

    return (
        <div className="relative w-full h-screen bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg')] bg-cover bg-center bg-no-repeat bg-fixed">
            <div className="bg-black/60 w-full h-screen">
                <nav className="px-12 py-5">
                    <Link href="/">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Logo" className="h-12 cursor-pointer hidden" />
                        <h1 className="text-red-600 text-4xl font-bold">NOMAD</h1>
                    </Link>
                </nav>

                <div className="flex justify-center">
                    <div className="bg-black/75 p-16 rounded-md w-full max-w-[450px] min-h-[600px] text-white">
                        <h1 className="text-3xl font-bold mb-8">Sign In</h1>
                        <form onSubmit={handleLogin} className="flex flex-col space-y-6">
                            <input
                                type="email"
                                placeholder="Email or phone number"
                                className="p-3.5 rounded bg-[#333] placeholder-gray-500 outline-none focus:bg-[#454545]"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="p-3.5 rounded bg-[#333] placeholder-gray-500 outline-none focus:bg-[#454545]"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button className="bg-red-600 py-3.5 rounded font-bold mt-4 hover:bg-red-700 transition">
                                Sign In
                            </button>

                            <div className="flex justify-between text-sm text-gray-400">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4" /> Remember me
                                </label>
                                <span className="hover:underline cursor-pointer">Need help?</span>
                            </div>
                        </form>

                        <div className="mt-16 text-gray-500">
                            <p>New to Nomad? <Link href="/signup" className="text-white hover:underline">Sign up now.</Link></p>
                            <p className="text-xs mt-4">
                                This page is protected by Google reCAPTCHA to ensure you're not a bot.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
