// src/app/(auth)/layout.js
import React from 'react';

export default function AuthLayout({ children }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      {children}
    </div>
  );
}