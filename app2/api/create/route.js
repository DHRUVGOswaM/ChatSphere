import { clerkClient } from "@clerk/nextjs/server";
import { StreamChat } from "stream-chat";

const api_key = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const api_secret = process.env.STREAM_SECRET_KEY;

export async function POST(request) {
  const serverClient = StreamChat.getInstance(api_key, api_secret);

  // The request body contains the user data from the Clerk webhook or client POST
  const user = await request.json();

  // Safety check for user ID existence
  if (!user || !user.data || !user.data.id) {
    return new Response("User data missing in request.", { status: 400 });
  }

  const userId = user.data.id;
  const userFirstName =
    user.data.firstName || user.data.username || `User-${userId.slice(-4)}`;

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  try {
    // ✅ Generate Stream Chat Token
    const token = serverClient.createToken(userId);

    // ✅ Create user in Stream
    await serverClient.upsertUser({
      id: userId,
      name: userFirstName,
    });

    // ✅ Store token in Clerk metadata (App Router-safe)
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        streamToken: token,
      },
    });

    // ✅ Add user to all forum channels
    const slugs = [
      "football-soccer",
      "cricket-fan-zone",
      "nba-basketball-talk",
      "formula-1-racing",
      "latest-blockbusters",
      "netflix-streaming",
      "music-releases-reviews",
      "video-game-chatter",
      "world-politics",
      "tech-science-updates",
      "business-finance",
      "local-community",
      "programming-code",
      "language-learning",
      "history-science",
      "career-study-tips",
    ];

    for (const slug of slugs) {
      const channel = serverClient.channel("messaging", slug, {
        image: "https://getstream.io/random_png/?name=react",
        name: capitalizeFirstLetter(slug.replace(/-/g, " ")),
        created_by_id: userId,
      });
      // We only need to create the channel once if it doesn't exist
      await channel.create();
      // Add user to existing channel (even if created above)
      await channel.addMembers([userId]);
    }

    console.log(`✅ Created user ${userId} and generated token`);
    return Response.json({ message: "User created", token });
  } catch (e) {
    console.error("API Route Error:", e);
    // Return a generic error response
    return new Response("Internal Server Error during user creation.", {
      status: 500,
    });
  }
}
