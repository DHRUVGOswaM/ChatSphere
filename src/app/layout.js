// src/app/layout.js
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar"; 
import Providers from "./components/Providers"; 


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ChatSphere - The Modern Chat Platform",
  description: "Connect instantly and communicate seamlessly with ChatSphere's lightning-fast and secure messaging and discussion forums.",
};

export default function RootLayout({ children }) {
  return (
    // ClerkProvider must wrap the entire application
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className={inter.className} suppressHydrationWarning>
          <Providers>
            <div className="flex flex-col min-h-screen bg-gray-900">
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              {/* Note: The Footer from app/page.js is specific to the homepage. */}
            </div>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}