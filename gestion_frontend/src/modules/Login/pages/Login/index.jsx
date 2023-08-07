import React, { useContext, useState } from "react";
import Header from "/src/components/Header";
import LoginForm from "/src/components/LoginForm";
import { LoginCalls } from "/src/modules/Login/utils/apiCalls";
import { AuthContext } from "/src/services/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const { setAuthToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const afterLogin = (data) => {
    const { access_token, error } = data;

    if (error) {
      alert(error);
    } else {
      setAuthToken(access_token);
      navigate("/");
    }
  };

  const handleSign = async (userData) => {
    if (isLogin) {
      LoginCalls.signIn({
        action: (data) => {
          afterLogin(data);
        },
        payload: userData,
      });
    } else {
      LoginCalls.signUp({
        action: (data) => {
          console.log(data);
        },
        payload: userData,
      });
    }
  };

  return (
    <main>
      <Header />
      <LoginForm
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        onSubmit={handleSign}
      />
    </main>
  );
}
