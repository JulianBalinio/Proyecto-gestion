import React, { useContext, useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { LoginCalls } from "../modules/Login/utils/apiCalls";

const ProtectedRoute = () => {
  const { token } = useContext(AuthContext);
  const [isTokenValid, setIsTokenValid] = useState(null);
  const [redirect, setRedirect] = useState(null); // Nuevo estado para redirección

  useEffect(() => {
    const verifyToken = async () => {
      LoginCalls.verifyToken({
        action: (response) => {
          if (response.status === 200) {
            setIsTokenValid(true);
          } else {
            setIsTokenValid(false);
          }
        },
      });
    };

    if (token) {
      verifyToken();
    } else {
      setIsTokenValid(false);
      localStorage.removeItem("access_token");
    }
  }, [token]);

  useEffect(() => {
    // Realizar la redirección después de verificar el token
    if (isTokenValid === false) {
      setRedirect("/login");
    }
  }, [isTokenValid]);

  // Redirigir si es necesario
  if (redirect) {
    return <Navigate to={redirect} />;
  }

  if (isTokenValid === null) {
    // Mostrar un estado de carga o contenido mientras se verifica el token
    return <div>Cargando...</div>;
  }

  return <Outlet />;
};

export default ProtectedRoute;
