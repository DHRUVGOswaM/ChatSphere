// src/app/(auth)/sign-in/page.js
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    // Customize appearance with the appearance prop if needed
    <SignIn routing="hash" />
  );
}