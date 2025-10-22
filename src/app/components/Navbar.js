// src/components/Navbar.js
import React from 'react';
import Link from 'next/link';
import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              ChatSphere
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150">
              Home
            </Link>
            <Link href="/forums" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150">
              Forums
            </Link>
            {/* You can add a dedicated Chat page here if needed */}
            {/* <Link href="/chat" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150">
              My Chats
            </Link> */}
          </div>

          {/* Auth Controls */}
          <div className="flex items-center space-x-4">
            <SignedIn>
              {/* User profile button from Clerk */}
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <Link
                href="/sign-in"
                className="text-gray-300 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition duration-150"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150"
              >
                Sign Up
              </Link>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
}