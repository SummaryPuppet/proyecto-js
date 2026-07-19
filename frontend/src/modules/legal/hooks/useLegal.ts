import { useParams } from "react-router-dom";

export const useLegal = () => {
  const { slug } = useParams<{ slug: string }>();

  const getPageTitle = (): string => {
    switch (slug) {
      case "terminos":
        return "Términos y Condiciones";
      case "privacidad":
        return "Política de Privacidad";
      case "cookies":
        return "Política de Cookies";
      default:
        return "Documento Legal";
    }
  };

  return {
    slug,
    pageTitle: getPageTitle(),
  };
};
