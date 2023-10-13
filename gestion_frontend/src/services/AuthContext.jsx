import React, { createContext, useState } from "react";
const AuthContext = createContext();
// const isDebugMode = import.meta.env.VITE_DEBUG === "true";

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("access_token"))

  const setAuthToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("access_token", newToken);
  };

  return (
    <AuthContext.Provider value={{ token, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
