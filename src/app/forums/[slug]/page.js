// src/app/forums/[slug]/page.js
"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { useChatContext, Channel } from "stream-chat-react";
import {
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  Window,
  LoadingIndicator,
} from "stream-chat-react";
import toast from "react-hot-toast";

// --- Utility Components/Data (from forum-page.js, needed here to map slug to name) ---

const slugify = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const categories = [
  {
    name: "Sports",
    topics: [
      { name: "Football (Soccer)" },
      { name: "Cricket Fan Zone" },
      { name: "NBA & Basketball Talk" },
      { name: "Formula 1 Racing" },
    ],
  },
  {
    name: "Entertainment",
    topics: [
      { name: "Latest Blockbusters" },
      { name: "Netflix & Streaming" },
      { name: "Music Releases & Reviews" },
      { name: "Video Game Chatter" },
    ],
  },
  {
    name: "News",
    topics: [
      { name: "World Politics" },
      { name: "Tech & Science Updates" },
      { name: "Business & Finance" },
      { name: "Local Community" },
    ],
  },
  {
    name: "Education",
    topics: [
      { name: "Programming & Code" },
      { name: "Language Learning" },
      { name: "History & Science" },
      { name: "Career & Study Tips" },
    ],
  },
];

// --- Main Component ---

export default function TopicChatPage() {
  const { slug } = useParams();
  const { client, setActiveChannel, isConnecting } = useChatContext();
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  // Derive the Topic Name from the slug
  const topicName = useMemo(() => {
    for (const category of categories) {
      for (const topic of category.topics) {
        if (slugify(topic.name) === slug) {
          return topic.name;
        }
      }
    }
    return slug; // Fallback to the slug if not found
  }, [slug]);

  useEffect(() => {
    if (!client || isConnecting) return;

    const channelId = `forum-topic-${slug}`; // Consistent ID generation
    const channelName = topicName;

    const fetchChannel = async () => {
      setLoading(true);
      try {
        // 1. Ask server to ensure user is added to the channel
        await fetch("/api/stream/channel", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            userId: client.userID,
            channelId: `forum-topic-${slug}`,
            channelName: topicName,
          }),
        });

        // 2. Then watch it on the client
        const chatChannel = client.channel("messaging", `forum-topic-${slug}`);
        await chatChannel.watch();
        setChannel(chatChannel);
        setActiveChannel(chatChannel);
      } catch (error) {
        console.error("Error setting up channel:", error);
        toast.error("Could not load the chat channel.");
      } finally {
        setLoading(false);
      }
    };

    fetchChannel();

    // Cleanup when the component unmounts
    return () => {
      if (channel) {
        channel.stopWatching();
      }
    };
  }, [client, slug, setActiveChannel, isConnecting, topicName]);

  if (loading || !client || isConnecting) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)]">
        <LoadingIndicator />
      </div>
    );
  }

  // The main chat interface
  return (
    <div className="container mx-auto p-4 md:p-8 h-[calc(100vh-64px)]">
      <h1 className="text-3xl font-bold text-white mb-4">Topic: {topicName}</h1>
      <div className="h-[90%] bg-gray-800 rounded-xl shadow-2xl">
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </div>
    </div>
  );
}
