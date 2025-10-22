// import ChatForums from "@/components/ui/ChatForums";
// import { currentUser } from "@clerk/nextjs/server";

// //import { Chat, useCreateChatClient } from "stream-chat-react";

// export default async function page({ params }) {
//   const user = await currentUser();
//   //console.log("CURRENT LOGGED IN USER ID IN FORUM PAGE:",user?.id);
//   const slug = (await params).slug;

//   return <ChatForums slug = {slug} clerkUser={{id:user.id,name:user.firstName,token:user.publicMetadata.token}} />;
// }


import { auth, currentUser } from "@clerk/nextjs/server";
// **FIXED IMPORT PATH:** Targeting the 'ui' subdirectory inside 'components'
import ChatForum from "../../../comp/ui/ChatForums"; 
import { generateStreamUserToken } from "@/lib/stream-token-generator"; 

// Next.js metadata export (Runs on Server)
export const metadata = {
    title: 'Chat Channel - ChatSphere',
    description: 'Dynamic forum chat channel.',
};

// Server Component (Default Export)
export default async function page({ params }) {
    const { userId } = auth();

    if (!userId) {
        // Authentication check. This should be handled by middleware, but it's a good fail-safe.
        return <div className="text-center mt-20 text-xl text-red-500">Authentication Required. Please sign in.</div>;
    }

    const user = await currentUser();
    
    // Safety check for user object
    if (!user) {
         return <div className="text-center mt-20 text-xl text-red-500">User data could not be loaded. Please try again.</div>;
    }

    // Generate Stream Token on the server
    // NOTE: Ensure your lib/stream-token-generator.js file is set up correctly
    const tokenResult = await generateStreamUserToken(
        user.id,
        user.firstName || user.username
    );

    if (tokenResult.error || !tokenResult.token) {
        console.error("Token generation failed:", tokenResult.error);
        return <div className="text-center mt-20 text-xl text-red-500">Error setting up chat: Failed to generate chat token.</div>;
    }

    // Construct the full user object to pass to the Client Component
    const clerkUserProps = {
        id: user.id,
        name: user.firstName || user.username,
        token: tokenResult.token, 
    };

    const slug = params.slug;

    return (
        <main className="min-h-screen bg-gray-950 p-4 md:p-8 flex justify-center">
            {/* Pass the complete user object and slug to the client component */}
            <ChatForum clerkUser={clerkUserProps} slug={slug} />
        </main>
    );
}