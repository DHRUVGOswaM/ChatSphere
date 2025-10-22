// // src/app/components/Providers.js
// "use client";

// import React, { useEffect, useState } from "react";
// import { useUser } from "@clerk/nextjs";
// import { StreamChat } from "stream-chat"; // CORRECT PACKAGE for the client class
// import {
//   Chat,
//   LoadingIndicator,
// } from "stream-chat-react"; // stream-chat-react is for components
// import "stream-chat-react/dist/css/v2/index.css";
// import { Toaster } from "react-hot-toast";

// const NEXT_PUBLIC_STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

// // NOTE: It is critical that this component is client-side ("use client")
// export default function Providers({ children }) {
//   const { isLoaded, user } = useUser();
//   const [chatClient, setChatClient] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!isLoaded) return;

//     // 1. Initialize the Chat Client
//     const client = new StreamChat(NEXT_PUBLIC_STREAM_API_KEY);
//     setChatClient(client);

//     const setupChat = async () => {
//       if (user) {
//         try {
//           // 2. Fetch the user token from the Next.js API route
//           // The API route is safe because it runs server-side and uses the secret key.
//           const response = await fetch("/api/stream/token", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//           });

//           const data = await response.json();

//           if (data.token) {
//             // 3. Connect the user to Stream Chat
//             await client.connectUser(
//               {
//                 id: user.id,
//                 name: user.username || user.fullName || `user-${user.id}`,
//                 image: user.imageUrl,
//               },
//               data.token
//             );
//           }
//         } catch (error) {
//           console.error("Error setting up chat connection:", error);
//           // Handle error (e.g., disconnect or show a toast)
//         }
//       } else {
//         // Disconnect when user logs out
//         if (client.user) {
//           await client.disconnectUser();
//         }
//       }
//       setLoading(false);
//     };

//     setupChat();

//     // Cleanup function: Disconnect user when the component unmounts
//     return () => {
//       if (client.user) {
//         client.disconnectUser();
//       }
//     };
//   }, [isLoaded, user]);

//   if (loading || (!user && isLoaded) ) {
//     // Show a loading state or a subtle placeholder
//     return <LoadingIndicator />;
//   }

//   // Only render the Chat context if the user is logged in AND the client is connected
//   if (user && chatClient) {
//     return (
//       <Chat client={chatClient}>
//         {children}
//         <Toaster position="bottom-right" />
//       </Chat>
//     );
//   }

//   // Render children normally for unauthenticated users (e.g., Homepage)
//   return <>{children}</>;
// }
"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { StreamChat } from "stream-chat"; // CORRECT PACKAGE for the client class
import { Chat, LoadingIndicator } from "stream-chat-react"; // stream-chat-react is for components
import "stream-chat-react/dist/css/v2/index.css";
import { Toaster } from "react-hot-toast";

const NEXT_PUBLIC_STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

export default function Providers({ children }) {
  const { isLoaded, user } = useUser();
  const [chatClient, setChatClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Only proceed when Clerk confirms its loaded state
    if (!isLoaded) return;

    // Initialize the Chat Client (this is cheap and fast)
    const client = new StreamChat(NEXT_PUBLIC_STREAM_API_KEY);
    setChatClient(client);

    const setupChat = async () => {
      // 2. Setup chat only if a user is logged in
      if (user) {
        try {
          // Fetch the user token from the secure Next.js API route
          const response = await fetch("/api/stream/token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
              credentials: "include",
          });

          const data = await response.json();

          if (data.token) {
            // 3. Connect the user to Stream Chat
            await client.connectUser(
              {
                id: user.id,
                name: user.username || user.fullName || `user-${user.id}`,
                image: user.imageUrl,
              },
              data.token
            );
          }
        } catch (error) {
          console.error("Error setting up chat connection:", error);
          // Don't disconnect here, let the connection attempt complete/fail
        }
      } else {
        // Disconnect if user logs out or if the app initializes and the user is null
        if (client.user) {
          await client.disconnectUser();
        }
      }
      // 4. Mark loading as false once the initial auth and connection attempt is complete
      setLoading(false);
    };

    setupChat();

    // Cleanup function: Disconnect user when the component unmounts
    return () => {
      if (client.user) {
        client.disconnectUser();
      }
    };
  }, [isLoaded, user]);

  // --- Conditional Rendering Logic ---

  // 1. If Clerk hasn't loaded OR if we are waiting for Stream connection to complete (in setupChat)
  if (loading || !isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <LoadingIndicator />
      </div>
    );
  }

  // 2. If user is signed in AND the Stream client is connected
  if (user && chatClient) {
    return (
      <Chat client={chatClient}>
        {children}
        <Toaster position="bottom-right" />
      </Chat>
    );
  }

  // Otherwise, render children without Chat context
  return <>{children}</>;
}
