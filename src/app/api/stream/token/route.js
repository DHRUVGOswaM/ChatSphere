import { auth, currentUser } from '@clerk/nextjs/server'; // FIX: Use /server for auth helpers
import { NextResponse } from 'next/server';
import { StreamChat } from 'stream-chat';

const STREAM_SECRET_KEY = process.env.STREAM_SECRET_KEY;
const NEXT_PUBLIC_STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

export async function POST(req) {
  try {
    // 1. Critical Environment Variable Check
    if (!STREAM_SECRET_KEY || !NEXT_PUBLIC_STREAM_API_KEY) {
        console.error("ENVIRONMENT ERROR: Stream API Key or Secret Key is missing.");
        return NextResponse.json(
            { error: "Configuration Error: Stream API keys are not set up correctly on the server." }, 
            { status: 500 }
        );
    }
      
    // Initialize Stream Chat Server Client
    const serverClient = StreamChat.getInstance(NEXT_PUBLIC_STREAM_API_KEY, STREAM_SECRET_KEY);

    // Use auth() to get the session data
    const user = await currentUser();

    if (!user || !user.id) {
      console.warn("Authentication required for token generation.");
      // The user object may exist but not be fully initialized in a request chain, so we check user.id
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    // Clerk's user ID is used as the Stream Chat user ID
    const clerkUserId = user.id;

    // Generate the Stream Chat token
    const token = serverClient.createToken(clerkUserId);

    return NextResponse.json({ token: token }, { status: 200 });

  } catch (error) {
    console.error("Stream Token Generation Failed:", error.message);
    // Return a generic 500 error to the client
    return NextResponse.json({ error: "Failed to generate Stream token due to an internal server error." }, { status: 500 });
  }
}
