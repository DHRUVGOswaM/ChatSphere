"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs'; 
import Link from 'next/link';
import { LoadingIndicator } from 'stream-chat-react';

export default function CreateChatPage() {
    const [chatName, setChatName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { isLoaded: authLoaded, userId } = useAuth();
    
    if (!authLoaded) {
        return <div className="p-8 text-center"><LoadingIndicator /></div>;
    }

    if (!userId) {
        return (
            <div className="p-8 text-center">
                <p className="text-gray-700 mb-4">Sign In Required to create a chat.</p>
                <Link href="/sign-in" className="text-indigo-600 hover:underline">Go to Sign In</Link>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await fetch('/api/chat/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chatName }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Server error creating chat.');
            }
            // Redirects to the new shareable chat link
            router.push(`/chat/${data.channelId}`);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-lg mx-auto bg-white rounded-lg shadow-xl mt-10">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Create Shareable Chat</h1>
            {error && <p className="text-red-500 mb-4 bg-red-100 p-2 rounded">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    required
                    value={chatName}
                    onChange={(e) => setChatName(e.target.value)}
                    disabled={loading}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter Chat Name"
                />
                <button
                    type="submit"
                    disabled={loading || !chatName.trim()}
                    className="w-full p-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 disabled:opacity-50"
                >
                    {loading ? 'Creating...' : 'Create Chat & Get Link'}
                </button>
            </form>
        </div>
    );
}
