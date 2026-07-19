import { useState, useCallback } from "react";
import type { Usuario } from "../../core/model/usuario";
import { recuperarUsuario } from "../utils/recuperarUsuario";
import { cerrarSesion } from "../utils/cerrarSesion";

export const useAuth = () => {
  const [user, setUser] = useState<Usuario | null>(() => recuperarUsuario());

  const login = useCallback((userData: Usuario) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    cerrarSesion();
    setUser(null);
  }, []);

  const isAuthenticated = user !== null;
  const userRole = user?.rol?.nombreRol ?? null;

  return {
    user,
    isAuthenticated,
    userRole,
    login,
    logout,
  };
};
