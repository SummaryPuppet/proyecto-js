import { Navigate } from "react-router-dom";
import LayoutPrincipal from "../../shared/layouts/LayoutPrincipal";
import LayoutHome from "../../modules/home/layouts/LayoutHome";
import LayoutAuth from "../../modules/auth/layouts/LayoutAuth";
import LayoutCompras from "../../modules/compras/layouts/LayoutCompras";
import LayoutDashboard from "../../modules/dashboard/layouts/LayoutDashboard";
import LayoutLegal from "../../modules/legal/layouts/LayoutLegal";
import Inicio from "../../modules/home/pages/Inicio";
import Informacion from "../../modules/home/pages/Informacion";
import EventDetail from "../../modules/home/pages/EventDetail";
import Login from "../../modules/auth/pages/Login";
import Registro from "../../modules/auth/pages/Registro";
import Perfil from "../../modules/auth/pages/Perfil";
import Compras from "../../modules/compras/pages/Compras";
import VerBoletos from "../../modules/compras/pages/VerBoletos";
import BoletoDetail from "../../modules/compras/pages/BoletoDetail";
import Dashboard from "../../modules/dashboard/pages/Dashboard";
import LegalPage from "../../modules/legal/pages/LegalPage";
import PaginaNoEncontrada from "../../modules/home/pages/PaginaNoEncontrada";

export const routesConfig = [
  {
    element: <LayoutPrincipal />,
    children: [
      {
        element: <LayoutHome />,
        children: [
          {
            index: true,
            element: <Inicio />,
          },
          {
            path: "informacion",
            element: <Informacion />,
          },
          {
            path: "evento/:id",
            element: <EventDetail />,
          },
        ],
      },
      {
        element: <LayoutAuth />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "registro",
            element: <Registro />,
          },
          {
            path: "perfil",
            element: <Perfil />,
          },
        ],
      },
      {
        element: <LayoutCompras />,
        children: [
          {
            path: "compras",
            element: <Compras />,
          },
          {
            path: "ver-boletos",
            element: <VerBoletos />,
          },
          {
            path: "boleto/:id",
            element: <BoletoDetail />,
          },
        ],
      },
      {
        element: <LayoutDashboard />,
        children: [
          {
            path: "dashboard",
            element: <Navigate to="/dashboard/gestionar" replace />,
          },
          {
            path: "dashboard/gestionar",
            element: <Dashboard />,
          },
        ],
      },
      {
        element: <LayoutLegal />,
        children: [
          {
            path: "legal/:slug",
            element: <LegalPage />,
          },
        ],
      },
      {
        path: "*",
        element: <PaginaNoEncontrada />,
      },
    ],
  },
];
