import React, { createContext, useEffect, useState } from "react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("refresh") || "");

  const setAuthToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("refresh", newToken);
  };

  useEffect(() => {
    if (!token) {
      const newToken = localStorage.getItem("refresh");
      setToken(newToken);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
