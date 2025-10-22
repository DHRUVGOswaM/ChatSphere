"use client"; // bcoz we use useState and UserButton

import React, { useState } from "react";
import Link from "next/link";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

//import {useUser} from "@clerk/nextjs";
const Navbar = () => {
  //const { user } = useUser();
  //console.log(user.user?.id);

  // State for controlling the mobile menu's open/close status
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Brand Name */}
        <Link
          href="/"
          className="text-xl font-bold hover:text-gray-300 transition duration-300 rounded-lg"
        >
          ChatSphere
        </Link>

        {/* Desktop Navigation Links and User Profile Button */}
        <ul className="hidden md:flex space-x-6 items-center">
          <li>
            <Link
              href="/"
              className="hover:text-gray-400 transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/forum"
              className="hover:text-gray-400 transition duration-300"
            >
              Forum
            </Link>
          </li>
          <li>
            <Link
              href="/chat"
              className="hover:text-gray-400 transition duration-300"
            >
              UserChat
            </Link>
          </li>
          <li>
            {/* <Link 
              href="/about" 
              className="hover:text-gray-400 transition duration-300"
            >
              About
            </Link> */}
          </li>
          {/* Clerk User Button */}
          <li className="ml-4">
            <UserButton afterSignOutUrl="/" />
          </li>
          {/* *** CLERK AUTH FIX *** */}
          <li className="ml-4">
            {/* 1. If signed in, show the profile button
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn> */}

            {/* 2. If signed out, show the Login button */}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </li>
        </ul>

        {/* Mobile Menu Button (Hamburger/Close Icon) */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white hover:text-gray-400 focus:outline-none p-2 rounded-lg"
            aria-label="Toggle Menu"
          >
            {/* Toggle icon based on state */}
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Toggled by State) */}
      <div
        className={`md:hidden ${
          isOpen ? "block" : "hidden"
        } border-t border-gray-700 mt-2`}
      >
        <ul className="flex flex-col space-y-2 py-4">
          <li>
            <Link
              href="/"
              className="block py-2 px-3 hover:bg-gray-700 rounded transition duration-300"
              onClick={toggleMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/forum"
              className="block py-2 px-3 hover:bg-gray-700 rounded transition duration-300"
              onClick={toggleMenu}
            >
              Forum
            </Link>
          </li>
          <li>
            <Link
              href="/chat"
              className="block py-2 px-3 hover:bg-gray-700 rounded transition duration-300"
              onClick={toggleMenu}
            >
              Userchat
            </Link>
          </li>

          {/* Clerk User Button in Mobile Menu */}
          <li className="px-3 pt-2">
            <UserButton afterSignOutUrl="/" />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
