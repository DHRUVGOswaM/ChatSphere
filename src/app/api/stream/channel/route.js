// import { StreamChat } from "stream-chat";
// import { auth } from "@clerk/nextjs/server";

// const serverClient = StreamChat.getInstance(
//   process.env.NEXT_PUBLIC_STREAM_API_KEY,
//   process.env.STREAM_API_SECRET
// );

// export async function POST(req) {
//   try {
//     const { userId, channelId, channelName } = await req.json();

//     const { userId: authenticatedId } = auth();
//     console.log("Authenticated user ID:", authenticatedId);

//     if (!authenticatedId || userId !== authenticatedId) {
//       return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
//     }

//     const channel = serverClient.channel("messaging", channelId, {
//       name: channelName,
//       image: "https://i.imgur.com/G5K5j6i.png",
//     });

//     await channel.create();
//     await channel.addMembers([userId]);

//     return new Response(JSON.stringify({ success: true }), { status: 200 });
//   } catch (err) {
//     console.error("Channel creation error:", err);
//     return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
//   }
// }
// src/app/api/stream/channel/route.js
import { StreamChat } from "stream-chat";
import { auth } from "@clerk/nextjs/server";

const serverClient = StreamChat.getInstance(
  process.env.STREAM_API_KEY,      // server key, not public
  process.env.STREAM_API_SECRET
);

export async function POST(req) {
  try {
    const { userId, channelId, channelName } = await req.json();

    const { userId: authenticatedId } = auth({ req }); // Pass request

    console.log("Authenticated user ID:", authenticatedId);

    if (!authenticatedId || userId !== authenticatedId) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401 }
      );
    }

    const channel = serverClient.channel("messaging", channelId, {
      name: channelName,
      image: "https://i.imgur.com/G5K5j6i.png",
      members: [userId], // add member during creation
    });

    await channel.create();

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Channel creation error:", err);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500 }
    );
  }
}
