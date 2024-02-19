import React from "react";
import LoginFormClient from "./_components/LoginComponents";
import { authProvider, handleLogin } from "./_lib/queries/loginqueries";

export default function LoginPage() {
  return (
    <div>
      <LoginFormClient handleLogin={handleLogin} authProvider={authProvider} />
    </div>
  );
}
