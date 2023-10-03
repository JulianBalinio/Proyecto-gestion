import React from "react";
import LoginForm from "/src/components/LoginForm";
import Header from "/src/components/Header";

export default function LoginTemplate({ onSubmit, error }) {
  return (
    <main>
      <Header />
      <LoginForm onSubmit={onSubmit} error={error}/>
    </main>
  );
}
