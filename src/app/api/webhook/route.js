// src/app/api/webhook/route.js
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { StreamChat } from 'stream-chat';

// NOTE: You must set up a Webhook Endpoint in your Clerk Dashboard
// pointing to your deployed API route (e.g., https://your-app.com/api/webhook)
// and get the Webhook Secret (CLERK_WEBHOOK_SECRET).

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
const STREAM_SECRET_KEY = process.env.STREAM_SECRET_KEY;
const NEXT_PUBLIC_STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

// Initialize Stream Chat Server Client
const serverClient = StreamChat.getInstance(NEXT_PUBLIC_STREAM_API_KEY, STREAM_SECRET_KEY);

export async function POST(req) {
  const payload = await req.json();
  const payloadString = JSON.stringify(payload);
  const headerPayload = headers();
  
  // Get the headers required to verify the webhook
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  // If there are missing headers, error out
  if (!svixId || !svixTimestamp || !svixSignature) {
    return new NextResponse('Error occured -- no svix headers', { status: 400 });
  }

  // Verify the webhook payload with the secret
  const wh = new Webhook(webhookSecret);
  let msg;

  try {
    msg = wh.verify(payloadString, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new NextResponse('Error occured -- invalid webhook signature', { status: 400 });
  }
  
  // Handle the event
  const eventType = msg.type;

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, first_name, last_name, username, image_url } = msg.data;
    
    // Create or update the user in Stream Chat
    await serverClient.upsertUser({
      id: id, // Clerk user ID
      name: username || `${first_name} ${last_name}`.trim() || id,
      image: image_url,
    });
  } else if (eventType === 'user.deleted') {
    const { id } = msg.data;
    
    // Delete the user from Stream Chat
    await serverClient.deleteUser(id);
  }

  return new NextResponse('', { status: 200 });
}