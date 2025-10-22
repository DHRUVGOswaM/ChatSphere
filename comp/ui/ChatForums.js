// "use client";
// import React, { useState, useEffect } from "react";
// import {
//     useCreateChatClient,
//     Chat,
//     Channel,
//     ChannelHeader,
//     MessageInput,
//     MessageList,
//     Thread,
//     Window,
// } from "stream-chat-react";
// import { StreamChat } from "stream-chat"; // Needed for channel.watch()
// import "stream-chat-react/dist/css/v2/index.css";

// function capitalizeFirstLetter(string) {
//     return string.charAt(0).toUpperCase() + string.slice(1);
// }

// const ChatForum = ({ clerkUser, slug }) => {
//     const apiKey = "fq3bfzj98xxj";
    
//     // NOTE: Props destructuring is clean, assuming these fields exist in clerkUser
//     const userId = clerkUser?.id; 
//     const userName = clerkUser?.name;
//     const userToken = clerkUser?.token;

//     const user = {
//         id: userId,
//         name: userName,
//         image: `https://getstream.io/random_png/?name=${userName}`,
//     };

//     const [channel, setChannel] = useState(null);
//     const [loadingChannel, setLoadingChannel] = useState(true); 

//     // Client initialization (uses Clerk-provided token)
//     const client = useCreateChatClient({
//         apiKey,
//         // Only initialize if the token exists to prevent TokenManager error
//         tokenOrProvider: userToken || undefined, 
//         userData: user,
//     });

//     useEffect(() => {
//         // Condition refinement: If essential authentication data or client is missing, stop.
//         // The console log is removed as this is expected behavior on first mount.
//         if (!client || !slug || !userId || !userToken) {
//             setLoadingChannel(false);
//             return;
//         }

//         const channelId = slug; 
        
//         // 1. Define channel structure
//         const targetChannel = client.channel("messaging", channelId, {
//             image: "https://getstream.io/random_png/?name=forum",
//             name: `${capitalizeFirstLetter(slug.replace(/-/g, ' '))} Discussion`,
//             members: [userId],
//         });

//         const setupChannel = async () => {
//             setLoadingChannel(true);
//             try {
//                 // CRITICAL FIX: Call watch() to connect and load messages
//                 await targetChannel.watch(); 
//                 setChannel(targetChannel);
//             } catch (error) {
//                 console.error("Error watching channel:", error);
//             } finally {
//                 setLoadingChannel(false);
//             }
//         };

//         setupChannel();

//         return () => {
//             if (targetChannel) {
//                 targetChannel.stopWatching();
//             }
//         };
//     }, [client, slug, userId, userToken]); 

//     // Loading states
//     // Added check for missing critical auth data
//     if (!userId || !userToken) return (
//         <div className="flex items-center justify-center h-[calc(100vh-120px)] text-red-500">
//             Authentication Error: User data is missing. Please sign in.
//         </div>
//     );
    
//     if (!client) return (
//         <div className="flex items-center justify-center h-[calc(100vh-120px)] text-gray-400">
//             Setting up client & connection...
//         </div>
//     );

//     if (loadingChannel || !channel) return (
//         <div className="flex items-center justify-center h-[calc(100vh-120px)] text-gray-400">
//             Joining #{capitalizeFirstLetter(slug.replace(/-/g, ' '))}...
//         </div>
//     );

//     // Main Chat UI
//     return (
//         <div className="h-[calc(100vh-120px)] w-full max-w-4xl mx-auto rounded-xl shadow-2xl overflow-hidden border border-gray-700">
//             <Chat client={client}>
//                 <Channel channel={channel}>
//                     <Window>
//                         <ChannelHeader />
//                         <MessageList />
//                         <MessageInput />
//                     </Window>
//                     <Thread />
//                 </Channel>
//             </Chat>
//              {/* Custom CSS to style Stream components to match your dark theme */}
//             <style jsx global>{`
//                 /* Ensure chat elements adopt the dark theme */
//                 .str-chat__container {
//                     background-color: #1f2937; /* Gray-800 */
//                 }
//                 .str-chat__header {
//                     background-color: #111827; /* Gray-900 */
//                     color: white;
//                 }
//                 .str-chat__message-input {
//                     background-color: #1f2937; /* Gray-800 */
//                 }
//                 .str-chat__input-react__textarea {
//                     background-color: #374151; /* Gray-700 */
//                     color: white;
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default ChatForum;
// "use client";
// //import { currentUser } from "@clerk/nextjs/server";
// import React, { use } from "react";
// import { useState, useEffect } from "react";
// import { UserItem, Channel as StreamChannel } from "stream-chat-react";
// import {
//   useCreateChatClient,
//   Chat,
//   Channel,
//   ChannelHeader,
//   MessageInput,
//   MessageList,
//   Thread,
//   Window,
// } from "stream-chat-react";
// import "stream-chat-react/dist/css/v2/index.css";

// function capitalizeFirstLetter(string) {
//   return string.charAt(0).toUpperCase() + string.slice(1);
// }

// const ChatForum = ({ clerkUser, slug }) => {
//   const apiKey = "fq3bfzj98xxj";
//   const userId = clerkUser.id;
//   const userName = clerkUser.firstName;
//   const userToken = clerkUser.token;

//   const user = {
//     id: userId,
//     name: userName,
//     image: `https://getstream.io/random_png/?name=${userName}`,
//   };
//   const [channel, setChannel] = useState();
//   const client = useCreateChatClient({
//     apiKey,
//     tokenOrProvider: userToken,
//     userData: user,
//   });

//   useEffect(() => {
//     if (!client) return;

//     const channel = client.channel("messaging", "custom_channel_id", {
//       image: "https://getstream.io/random_png/?name=react",
//       name: capitalizeFirstLetter(slug) + " Discussion",

//       members: [userId],
//     });

//     setChannel(channel);
//   }, [client]);

//   if (!client) return <div>Setting up client & connection...</div>;

//   return (
//     <Chat client={client}>
//       <Channel channel={channel}>
//         <Window>
//           <ChannelHeader />
//           <MessageList />
//           <MessageInput />
//         </Window>
//         <Thread />
//       </Channel>
//     </Chat>
//   );
// };
// export default ChatForum;


"use client";

import React, { useState, useEffect } from "react";
import {
  useCreateChatClient,
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const ChatForum = ({ clerkUser, slug }) => {
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

  const userId = clerkUser?.id;
  const userName = clerkUser?.name;
  const userToken = clerkUser?.token;

  const user = {
    id: userId,
    name: userName,
    image: `https://getstream.io/random_png/?name=${userName}`,
  };

  const [channel, setChannel] = useState(null);
  const [loadingChannel, setLoadingChannel] = useState(true);

  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: userToken || undefined,
    userData: user,
  });

  useEffect(() => {
    if (!client || !slug || !userId || !userToken) {
      setLoadingChannel(false);
      return;
    }

    const channelId = slug;
    const targetChannel = client.channel("messaging", channelId, {
      name: `${capitalizeFirstLetter(slug.replace(/-/g, " "))} Discussion`,
      image: "https://getstream.io/random_png/?name=forum",
      members: [userId],
    });

    const setupChannel = async () => {
      setLoadingChannel(true);
      try {
        await targetChannel.watch();
        setChannel(targetChannel);
      } catch (error) {
        console.error("Error watching channel:", error);
      } finally {
        setLoadingChannel(false);
      }
    };

    setupChannel();

    return () => {
      if (targetChannel) targetChannel.stopWatching();
    };
  }, [client, slug, userId, userToken]);

  if (!userId || !userToken)
    return (
      <div className="flex items-center justify-center h-[calc(100vh-120px)] text-red-500">
        Authentication Error: User data is missing. Please sign in.
      </div>
    );

  if (!client)
    return (
      <div className="flex items-center justify-center h-[calc(100vh-120px)] text-gray-400">
        Setting up client & connection...
      </div>
    );

  if (loadingChannel || !channel)
    return (
      <div className="flex items-center justify-center h-[calc(100vh-120px)] text-gray-400">
        Joining #{capitalizeFirstLetter(slug.replace(/-/g, " "))}...
      </div>
    );

  return (
    <div className="h-[calc(100vh-120px)] w-full max-w-4xl mx-auto rounded-xl shadow-2xl overflow-hidden border border-gray-700">
      <Chat client={client}>
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
      <style jsx global>{`
        .str-chat__container {
          background-color: #1f2937;
        }
        .str-chat__header {
          background-color: #111827;
          color: white;
        }
        .str-chat__message-input {
          background-color: #1f2937;
        }
        .str-chat__input-react__textarea {
          background-color: #374151;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default ChatForum;
