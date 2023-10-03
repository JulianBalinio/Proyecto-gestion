import React, { useContext, useState } from "react";
import { LoginCalls } from "/src/modules/Login/utils/apiCalls";
import { AuthContext } from "/src/services/AuthContext";
import { useNavigate } from "react-router-dom";
import LoginTemplate from "/src/modules/Login/templates/Login";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const { setAuthToken } = useContext(AuthContext);

  const afterLogin = (data) => {
    const { access_token, detail, error, email_address } = data;
    if (!access_token) {
      setError(detail || error || email_address);
    } else {
      setAuthToken(access_token);
      navigate("/");
    }
  };

  const handleSignIn = async (userData) => {
    setError(null);
    LoginCalls.signIn({
      action: (data) => {
        afterLogin(data);
      },
      payload: userData,
    });
  };

  return <LoginTemplate onSubmit={handleSignIn} error={error} />;
}
