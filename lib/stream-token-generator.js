import { StreamChat } from 'stream-chat';

const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY; 
const STREAM_SECRET = process.env.STREAM_SECRET_KEY; 

const serverClient = StreamChat.getInstance(STREAM_API_KEY, STREAM_SECRET);

export async function generateStreamUserToken(clerkUserId, userName) {
    if (!clerkUserId || !STREAM_API_KEY || !STREAM_SECRET) {
        console.error("Stream initialization error: Keys or Clerk user ID missing.");
        return { error: "Missing required authentication data on server." };
    }

    try {
        await serverClient.upsertUser({
            id: clerkUserId,
            name: userName || `User-${clerkUserId.slice(-4)}`,
            image: `https://getstream.io/random_png/?name=${userName || clerkUserId}`,
        });
        const token = serverClient.createToken(clerkUserId);
        
        return { token };

    } catch (error) {
        console.error("Error generating Stream token:", error);
        return { error: "Failed to generate chat token." };
    }
}