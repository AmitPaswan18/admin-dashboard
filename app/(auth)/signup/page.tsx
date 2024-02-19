import React from "react";
import SignUpFormClient from "@/app/_components/SignupComponents";
import { authProvider } from "@/app/_lib/queries/loginqueries";
import handleSignUp from "@/app/_lib/queries/signupqueries";

export default function SignUpPage() {
  return (
    <div>
      <SignUpFormClient
        handleSignUp={handleSignUp}
        authProvider={authProvider}
      />
    </div>
  );
}
