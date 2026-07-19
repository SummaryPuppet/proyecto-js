import { useState } from "react";
import { useNavigate } from "react-router";
import { registrarUsuario } from "../../../core/services/usuarioService";
import type { FormData, TextosRegistro } from "../interfaces/RegistroTypes";

const texts: Record<"es" | "en", TextosRegistro> = {
  es: {
    welcome: "¡Bienvenido a TicketPlus+!",
    modalTitle: "Bienvenido a TicketPlus+",
    modalBody: "Registro exitoso",
    modalBtn: "Continuar",
    subtitle: "Crea tu cuenta para vivir la mejor experiencia en eventos.",
    badge: "Registro de Usuario",
    name: "Nombre",
    lastname: "Apellido",
    phone: "Teléfono",
    email: "Correo Electrónico",
    pass: "Contraseña",
    confirm: "Confirmar contraseña",
    btn: "Registrarse",
    link: "¿Ya tienes cuenta? Inicia sesión",
    errorName: "Debes ingresar tu nombre",
    errorLastname: "Debes ingresar tu apellido",
    errorPhone: "Debes ingresar tu teléfono",
    errorEmail: "Debes ingresar tu correo",
    errorInvalidEmail: "Correo no válido",
    errorPass: "La contraseña debe tener al menos 6 caracteres",
    errorMatch: "Las contraseñas no coinciden",
    errorBackend: "Error al registrar. Revisa los datos o el correo.",
  },
  en: {
    welcome: "Welcome to TicketPlus+!",
    modalTitle: "Welcome to TicketPlus+",
    modalBody: "Successful registration",
    modalBtn: "Continue",
    subtitle: "Create your account for the best event experience.",
    badge: "User Registration",
    name: "First Name",
    lastname: "Last Name",
    phone: "Phone",
    email: "Email Address",
    pass: "Password",
    confirm: "Confirm Password",
    btn: "Sign Up",
    link: "Already have an account? Sign In",
    errorName: "You must enter your name",
    errorLastname: "You must enter your last name",
    errorPhone: "You must enter your phone",
    errorEmail: "You must enter your email",
    errorInvalidEmail: "Invalid email",
    errorPass: "Password must be at least 6 characters",
    errorMatch: "Passwords do not match",
    errorBackend: "Registration error. Check your data or email.",
  },
};

export const useRegistro = () => {
  const navigate = useNavigate();

  const [language, setLanguage] = useState<"es" | "en">("es");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof FormData, string>>
  >({});

  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    apellido: "",
    telefono: "",
    correo: "",
    contrasena: "",
    confirmar: "",
  });
  const [error, setError] = useState("");

  const t = texts[language];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name as keyof FormData]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

    if (!formData.nombre.trim()) newErrors.nombre = t.errorName;
    if (!formData.apellido.trim()) newErrors.apellido = t.errorLastname;
    if (!formData.telefono.trim()) newErrors.telefono = t.errorPhone;
    if (!formData.correo.trim()) {
      newErrors.correo = t.errorEmail;
    } else if (!emailRegex.test(formData.correo)) {
      newErrors.correo = t.errorInvalidEmail;
    }
    if (formData.contrasena.length < 6) newErrors.contrasena = t.errorPass;
    if (formData.contrasena !== formData.confirmar)
      newErrors.confirmar = t.errorMatch;

    setFieldErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await registrarUsuario({
        nombre: formData.nombre,
        apellido: formData.apellido,
        telefono: formData.telefono,
        correo: formData.correo,
        contrasena: formData.contrasena,
      });
      setShowSuccessModal(true);
    } catch {
      setError(t.errorBackend);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateLogin = () => navigate("/login");

  return {
    language,
    setLanguage,
    showPassword,
    setShowPassword,
    showConfirm,
    setShowConfirm,
    showSuccessModal,
    isLoading,
    fieldErrors,
    formData,
    error,
    t,
    handleChange,
    handleSubmit,
    handleNavigateLogin,
  };
};
