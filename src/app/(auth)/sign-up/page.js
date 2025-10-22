// src/app/(auth)/sign-up/page.js
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    // Customize appearance with the appearance prop if needed
   <SignUp routing="hash" />

  );
}