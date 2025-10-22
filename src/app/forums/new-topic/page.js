// src/app/forums/new-topic/page.js
import React from 'react';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';

export const metadata = {
  title: "Create Topic - ChatSphere",
  description: "Start a new discussion topic on ChatSphere forums.",
};

export default function NewTopicPage() {
  return (
    <div className="container mx-auto max-w-2xl py-20 px-4 text-center">
      <h1 className="text-4xl font-extrabold mb-6 text-purple-400">
        Start a New Discussion Topic
      </h1>
      <SignedOut>
        <div className="p-8 bg-gray-800 rounded-xl shadow-xl border border-gray-700">
          <p className="text-xl text-gray-300 mb-6">
            You must be signed in to create a new discussion topic.
          </p>
          <Link
            href="/sign-in"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-purple-600 hover:bg-purple-700 transition duration-300"
          >
            Sign In to Start
          </Link>
        </div>
      </SignedOut>
      <SignedIn>
        {/*
          TODO: Implement an actual form here to create a new topic/channel.
          This would typically involve:
          1. A form with Topic Title, Category, and Description.
          2. A POST request to an internal API.
          3. The API would create a new Stream Chat channel and store the metadata in a database.
          4. Redirect the user to the newly created channel page.
        */}
        <div className="p-8 bg-gray-800 rounded-xl shadow-xl border border-gray-700">
          <p className="text-xl text-gray-300 mb-6">
            **Feature Coming Soon!** You're signed in and ready to create.
            For now, please choose an existing topic.
          </p>
          <Link
            href="/forums"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300"
          >
            Browse Existing Forums
          </Link>
        </div>
      </SignedIn>
    </div>
  );
}