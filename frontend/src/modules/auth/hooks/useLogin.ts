import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUsuario } from "../../../core/services/usuarioService";
import { useAuth } from "../../../shared/hooks/useAuth";
import type { TextosIdioma } from "../interfaces/LoginTypes";

const texts: Record<"es" | "en", TextosIdioma> = {
  es: {
    welcome: "¡Bienvenido a Ticket Plus+!",
    successTitle: "Bienvenido a Ticket Plus+",
    success: "Login exitoso",
    continue: "Continuar",
    subtitle: "Ingresa para vivir la mejor experiencia en eventos.",
    badge: "Inicio de Sesión",
    email: "Correo Electrónico",
    emailPlaceholder: "Ingresa tu correo",
    password: "Contraseña",
    passwordPlaceholder: "Ingresa tu contraseña",
    login: "Ingresar",
    forgot: "¿Olvidaste tu contraseña?",
    register: "¿Aún no tienes cuenta? Regístrate",
    errorEmail: "Debes ingresar el correo",
    errorPass: "Debes ingresar la contraseña",
    errorInvalidEmail: "Correo no válido",
    errorAuth: "Correo o contraseña incorrectos",
  },
  en: {
    welcome: "Welcome to Ticket Plus+!",
    successTitle: "Welcome to Ticket Plus+",
    success: "Login successful",
    continue: "Continue",
    subtitle: "Sign in for the best event experience.",
    badge: "Login",
    email: "Email Address",
    emailPlaceholder: "Enter your email",
    password: "Password",
    passwordPlaceholder: "Enter your password",
    login: "Sign In",
    forgot: "Forgot your password?",
    register: "Don't have an account yet? Sign up",
    errorEmail: "You must enter your email",
    errorPass: "You must enter your password",
    errorInvalidEmail: "Invalid email",
    errorAuth: "Invalid email or password",
  },
};

export const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [language, setLanguage] = useState<"es" | "en">("es");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const t = texts[language];

  const validateForm = (): boolean => {
    const newErrors: string[] = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

    if (email.trim() === "") {
      newErrors.push(t.errorEmail);
    } else if (!emailRegex.test(email)) {
      newErrors.push(t.errorInvalidEmail);
    }

    if (password.trim() === "") {
      newErrors.push(t.errorPass);
    } else if (password.length < 6) {
      newErrors.push(
        language === "es"
          ? "La contraseña debe tener al menos 6 caracteres"
          : "Password must be at least 6 characters"
      );
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors([]);

    try {
      const data = await loginUsuario({
        correo: email,
        contrasena: password,
      });

      if (data) {
        login(data);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Error capturado:", error);
      setErrors([t.errorAuth]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateHome = () => navigate("/");
  const handleNavigateRegistro = () => navigate("/registro");

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    errors,
    language,
    setLanguage,
    isLoggedIn,
    isLoading,
    t,
    handleSubmit,
    handleNavigateHome,
    handleNavigateRegistro,
  };
};
