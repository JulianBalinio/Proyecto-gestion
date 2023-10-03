import React, { useContext, useState } from "react";
import { LoginCalls } from "/src/modules/Login/utils/apiCalls";
import { AuthContext } from "/src/services/AuthContext";
import { useNavigate } from "react-router-dom";
import LoginTemplate from "/src/modules/Login/templates/Login";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const { setAuthToken } = useContext(AuthContext);

  const afterLogin = (response) => {
    const { access_token, detail, error, email } = response.data;
    if (!access_token) {
      setError(detail || error || email);
    } else {
      setAuthToken(access_token);
      navigate("/");
    }
  };

  const handleSignIn = async (userData) => {
    setError(null);
    LoginCalls.signIn({
      action: (response) => {
        afterLogin(response);
      },
      payload: userData,
    });
  };

  return <LoginTemplate onSubmit={handleSignIn} error={error} />;
}
