// "use client";

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useUser, SignedOut } from '@clerk/nextjs';
// import Link from 'next/link';
// import toast from 'react-hot-toast';

// export default function CreateChatPage() {
//   const [chatName, setChatName] = useState('');
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const { isLoaded, isSignedIn } = useUser();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!chatName.trim() || !isSignedIn) return;

//     setLoading(true);
//     toast.loading("Creating chat...", { id: 'create_chat_toast' });

//     try {
//       const response = await fetch("/api/chat/create", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ chatName: chatName.trim() }),
//       });

//       const data = await response.json();

//       if (response.ok && data.channelId) {
//         toast.success("Chat created! Redirecting...", { id: 'create_chat_toast' });
//         // Redirect to the newly created chat using its unique ID
//         router.push(`/chat/${data.channelId}`);
//       } else {
//         throw new Error(data.error || "Failed to create chat channel.");
//       }

//     } catch (error) {
//       console.error(error);
//       toast.error(error.message || "An unexpected error occurred.", { id: 'create_chat_toast' });
//       setLoading(false);
//     }
//   };

//   if (!isLoaded) {
//     return <div className="text-center py-20 text-gray-400">Loading user data...</div>;
//   }

//   if (!isSignedIn) {
//     return (
//       <div className="container mx-auto max-w-xl py-20 px-4 text-center">
//         <SignedOut>
//           <div className="p-8 bg-gray-800 rounded-xl shadow-xl border border-gray-700">
//             <h1 className="text-3xl font-extrabold mb-4 text-red-400">Access Denied</h1>
//             <p className="text-xl text-gray-300 mb-6">You must be signed in to create a private chat.</p>
//             <Link
//               href="/sign-in"
//               className="inline-flex items-center px-6 py-3 text-base font-medium rounded-full shadow-sm text-white bg-purple-600 hover:bg-purple-700 transition duration-300"
//             >
//               Sign In
//             </Link>
//           </div>
//         </SignedOut>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto max-w-xl py-20 px-4">
//       <h1 className="text-4xl font-extrabold text-white mb-8 text-center">
//         Create a Private Group Chat
//       </h1>
//       <form onSubmit={handleSubmit} className="p-8 bg-gray-800 rounded-xl shadow-2xl border border-indigo-700 space-y-6">
//         <div>
//           <label htmlFor="chatName" className="block text-sm font-medium text-gray-300 mb-2">
//             Group Chat Name:
//           </label>
//           <input
//             id="chatName"
//             type="text"
//             value={chatName}
//             onChange={(e) => setChatName(e.target.value)}
//             required
//             placeholder="e.g., Weekend Gaming Crew"
//             className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-purple-500 focus:border-purple-500 transition duration-150"
//             disabled={loading}
//           />
//         </div>
        
//         <button
//           type="submit"
//           disabled={loading || !chatName.trim()}
//           className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50 transition duration-300"
//         >
//           {loading ? 'Creating...' : 'Create Chat & Get Link'}
//         </button>
        
//         <p className="text-sm text-center text-gray-400 pt-2">
//             Once created, you can share the resulting URL with friends to invite them.
//         </p>
//       </form>
//     </div>
//   );
// }
import { StreamChat } from 'stream-chat';
import { getServerSession } from "next-auth"; // Assuming NextAuth for session management
import { v4 as uuidv4 } from 'uuid';

// Initialize the Stream Chat server client
// NOTE: Make sure to set STREAM_SECRET in your environment variables
const api_key = process.env.NEXT_PUBLIC_STREAM_KEY;
const api_secret = process.env.STREAM_SECRET;

// Ensure both keys are available
if (!api_key || !api_secret) {
    console.error("Missing Stream API Key or Secret. Check environment variables.");
    // In a real app, you'd handle this more gracefully
}

const serverClient = new StreamChat(api_key, api_secret);

// Next.js App Router POST handler
export async function POST(request) {
    try {
        // 1. Authenticate and get the current user session
        const session = await getServerSession();
        if (!session || !session.user || !session.user.email) {
            return new Response(JSON.stringify({ error: 'Authentication required.' }), { status: 401 });
        }
        
        // The userId should match the ID used to generate the user token for Stream
        const creatorId = session.user.email; 
        const { chatName } = await request.json();

        if (!chatName) {
            return new Response(JSON.stringify({ error: 'Chat name is required.' }), { status: 400 });
        }

        // 2. Generate a unique ID for the channel (this is the shareable link ID)
        const channelId = `private-${uuidv4()}`;

        // 3. Create the private channel
        const channel = serverClient.channel('private', channelId, {
            name: chatName,
            image: `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/200/200`,
            created_by_id: creatorId,
            // Add the creator as the first member
            members: [creatorId],
        });

        // 4. Execute the creation and persistence
        await channel.create();
        
        // 5. Respond with the unique channel ID for client-side redirection
        return new Response(JSON.stringify({ channelId }), { status: 200 });

    } catch (error) {
        console.error('Error creating Stream Channel:', error);
        return new Response(JSON.stringify({ error: 'Failed to create chat channel.' }), { status: 500 });
    }
}
