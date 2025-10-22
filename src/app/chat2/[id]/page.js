// "use client";

// import { useEffect, useState } from 'react';
// import { useAuth } from '@clerk/nextjs'; 
// import { useParams } from 'next/navigation';
// import Link from 'next/link';
// import {
//     StreamChat, Chat, Channel, ChannelHeader, MessageList, MessageInput, LoadingIndicator, Window,
// } from 'stream-chat-react';
// import 'stream-chat-react/dist/css/v2/index.css'; 

// const apiKey = process.env.NEXT_PUBLIC_STREAM_KEY;
// const chatClient = apiKey ? new StreamChat(apiKey) : null;

// function DynamicChatLogic({ channelId, userId, token }) {
//     const [channel, setChannel] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         if (!chatClient || !userId || !token) {
//             setError("Missing client or user data.");
//             setLoading(false);
//             return;
//         }

//         const connectAndJoin = async () => {
//             try {
//                 // Connect with Clerk's userId and the Stream token
//                 await chatClient.connectUser({ id: userId }, token);
                
//                 // Get the channel
//                 const targetChannel = chatClient.channel('private', channelId);
//                 await targetChannel.watch();

//                 // Auto-join logic if user is not a member
//                 const isMember = targetChannel.state.members[userId];
//                 if (!isMember) {
//                     await targetChannel.addMembers([userId]);
//                 }
                
//                 setChannel(targetChannel);
//                 setError(null);
//             } catch (err) {
//                 console.error('Channel operation error:', err);
//                 // Catch specific API errors here if needed
//                 setError('Failed to load or join chat. The link may be invalid.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         connectAndJoin();

//         return () => {
//             if (chatClient.wsConnection) chatClient.disconnectUser();
//         };

//     }, [channelId, userId, token]);

//     if (loading) {
//         return <div className="h-screen flex items-center justify-center"><LoadingIndicator /></div>;
//     }

//     if (error || !channel) {
//         return (
//             <div className="h-screen flex items-center justify-center p-4">
//                 <div className="text-center p-8 border rounded shadow-md bg-white">
//                     <p className="text-red-500 mb-4">{error || "Channel not found."}</p>
//                     <Link href="/chat/create" className="text-indigo-600 hover:underline">Create a new chat</Link>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="h-screen flex items-center justify-center p-4 bg-gray-50">
//             <div className="w-full max-w-4xl h-[90vh] shadow-2xl rounded-xl overflow-hidden bg-white">
//                 <Channel channel={channel}>
//                     <Window>
//                         <ChannelHeader />
//                         <MessageList />
//                         <MessageInput />
//                     </Window>
//                 </Channel>
//             </div>
//         </div>
//     );
// }

// export default function DynamicChatPageWrapper() {
//     const params = useParams();
//     const channelId = params.id;
//     const { isLoaded: authLoaded, userId, getToken } = useAuth();
//     const [streamToken, setStreamToken] = useState(null);

//     // Fetch Stream Token using Clerk
//     useEffect(() => {
//         // Only run if authentication is ready, user is present, and token is not yet fetched
//         if (!authLoaded || !userId || streamToken) return;

//         const fetchToken = async () => {
//             try {
//                 // This requires the 'stream-chat-token' JWT Template in Clerk Dashboard.
//                 const token = await getToken({ template: 'stream-chat-token' });
//                 setStreamToken(token);
//             } catch (e) {
//                 console.error("Token fetch failed. Check Clerk config.", e);
//             }
//         };
//         fetchToken();
//     }, [authLoaded, userId, getToken, streamToken]);

//     if (!apiKey || !chatClient) {
//         return <div className="text-center p-8 text-red-500">Configuration Error: Missing NEXT_PUBLIC_STREAM_KEY.</div>;
//     }

//     if (!authLoaded || (userId && !streamToken)) {
//         return <div className="h-screen flex items-center justify-center"><LoadingIndicator /></div>;
//     }

//     if (!userId) {
//         return (
//             <div className="text-center p-8">
//                 <p className="text-gray-700 mb-4">Sign In Required to join this chat.</p>
//                 <Link href="/sign-in" className="text-indigo-600 hover:underline">Go to Sign In</Link>
//             </div>
//         );
//     }
    
//     // Renders if all conditions (API Key, Auth, Token) are met
//     return (
//         <Chat client={chatClient}>
//             <DynamicChatLogic 
//                 channelId={channelId} 
//                 userId={userId} 
//                 token={streamToken}
//             />
//         </Chat>
//     );
    
// }
"use client";

import { useEffect, useState, useMemo } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
    Chat,
    Channel,
    ChannelHeader,
    MessageList,
    MessageInput,
    LoadingIndicator,
    Window,
} from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
//import 'stream-chat-react/dist/css/v2/index.css';

// ✅ Moved into component and memoized
function DynamicChatLogic({ chatClient, channelId, userId, token }) {
    const [channel, setChannel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!chatClient || !userId || !token) {
            setError("Missing client or user data.");
            setLoading(false);
            return;
        }

        const connectAndJoin = async () => {
            try {
                // Connect user
                await chatClient.connectUser({ id: userId }, token);

                const targetChannel = chatClient.channel('private', channelId);
                await targetChannel.watch();

                const isMember = targetChannel.state.members[userId];
                if (!isMember) {
                    await targetChannel.addMembers([userId]);
                }

                setChannel(targetChannel);
                setError(null);
            } catch (err) {
                console.error('Channel operation error:', err);
                setError('Failed to load or join chat. The link may be invalid.');
            } finally {
                setLoading(false);
            }
        };

        connectAndJoin();

        return () => {
            if (chatClient?.userID) {
                chatClient.disconnectUser();
            }
        };
    }, [chatClient, channelId, userId, token]);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <LoadingIndicator />
            </div>
        );
    }

    if (error || !channel) {
        return (
            <div className="h-screen flex items-center justify-center p-4">
                <div className="text-center p-8 border rounded shadow-md bg-white">
                    <p className="text-red-500 mb-4">{error || "Channel not found."}</p>
                    <Link href="/chat/create" className="text-indigo-600 hover:underline">
                        Create a new chat
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen flex items-center justify-center p-4 bg-gray-50">
            <div className="w-full max-w-4xl h-[90vh] shadow-2xl rounded-xl overflow-hidden bg-white">
                <Channel channel={channel}>
                    <Window>
                        <ChannelHeader />
                        <MessageList />
                        <MessageInput />
                    </Window>
                </Channel>
            </div>
        </div>
    );
}

// ✅ Main Page Component
export default function DynamicChatPageWrapper() {
    const params = useParams();
    const channelId = params?.id;
    const { isLoaded: authLoaded, userId, getToken } = useAuth();
    const [streamToken, setStreamToken] = useState(null);

    const apiKey = process.env.NEXT_PUBLIC_STREAM_KEY;

    // ✅ Safer client initialization
    const chatClient = useMemo(() => {
        if (apiKey) {
            return new StreamChat(apiKey);
        }
        return null;
    }, [apiKey]);

    // ✅ Fetch user token from Clerk
    useEffect(() => {
        if (!authLoaded || !userId || streamToken) return;

        const fetchToken = async () => {
            try {
                const token = await getToken({ template: 'stream-chat-token' });
                setStreamToken(token);
            } catch (err) {
                console.error('Token fetch failed. Check Clerk configuration.', err);
            }
        };

        fetchToken();
    }, [authLoaded, userId, getToken, streamToken]);

    if (!chatClient) {
        return (
            <div className="text-center p-8 text-red-500">
                Configuration Error: Missing NEXT_PUBLIC_STREAM_KEY.
            </div>
        );
    }

    if (!authLoaded || (userId && !streamToken)) {
        return (
            <div className="h-screen flex items-center justify-center">
                <LoadingIndicator />
            </div>
        );
    }

    if (!userId) {
        return (
            <div className="text-center p-8">
                <p className="text-gray-700 mb-4">Sign In Required to join this chat.</p>
                <Link href="/sign-in" className="text-indigo-600 hover:underline">
                    Go to Sign In
                </Link>
            </div>
        );
    }

    return (
        <Chat client={chatClient}>
            <DynamicChatLogic
                chatClient={chatClient}
                channelId={channelId}
                userId={userId}
                token={streamToken}
            />
        </Chat>
    );
}
