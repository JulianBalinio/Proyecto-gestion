import React from "react";
import LoginForm from "/src/components/LoginForm";
import { LoginCalls } from "/src/modules/Login/utils/ApiCalls";

export default function Login() {
  const handleLogin = async (userData) => {
    LoginCalls.signIn({
      action: () => {},
      payload: userData,
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
}
