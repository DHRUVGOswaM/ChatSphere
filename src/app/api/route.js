import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { StreamChat } from 'stream-chat';
import crypto from 'crypto';

const apiKey = process.env.NEXT_PUBLIC_STREAM_KEY;
const apiSecret = process.env.STREAM_SECRET;

export async function POST(request) {
    if (!apiSecret || !apiKey) {
        return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
    }

    const { userId } = auth();
    console.log('Authenticated userId:', userId);

    if (!userId) {
        return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
    }

    const { chatName } = await request.json();

    if (!chatName) {
        return NextResponse.json({ error: 'Chat name is required.' }, { status: 400 });
    }

    try {
        const serverClient = StreamChat.getInstance(apiKey, apiSecret);
        
        // Generate a unique ID (UUID style) for the channel
        const channelId = `private-${crypto.randomUUID()}`;

        // Create the channel and immediately add the creator (userId) as a member
        const channel = serverClient.channel('private', channelId, {
            name: chatName,
            created_by_id: userId,
            members: [userId],
            enforce_uniqueness: false,
        });

        await channel.create();

        return NextResponse.json({ channelId }, { status: 200 });
    } catch (error) {
        console.error("Stream Channel Creation Error:", error);
        return NextResponse.json({ error: 'Failed to create channel.' }, { status: 500 });
    }
}
