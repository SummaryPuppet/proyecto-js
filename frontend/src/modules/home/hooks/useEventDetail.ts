import { useParams, useNavigate } from "react-router-dom";
import { eventosData } from "../data/eventosData";
import { useAuth } from "../../../shared/hooks/useAuth";
import { formatFecha } from "../../../shared/utils/formatFecha";
import type { EventoDetalle } from "../interfaces/EventDetailTypes";

const zonas = [
  { nombre: "General", tipo: "GENERAL" },
  { nombre: "VIP", tipo: "VIP" },
  { nombre: "Palco", tipo: "PALCO" },
];

export const useEventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const evento = eventosData.find((e) => e.id === Number(id));

  const getEventoDetalle = (): EventoDetalle | null => {
    if (!evento) return null;
    return {
      ...evento,
      zona: zonas[0].nombre,
      tipo: zonas[0].tipo,
    };
  };

  const handleComprar = (zona: string, tipo: string) => {
    if (!evento) return;

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    navigate("/compras", {
      state: {
        evento: evento.titulo,
        fecha: evento.fecha,
        lugar: evento.lugar,
        ciudad: evento.ciudad,
        zona,
        tipo,
        precio: evento.precio,
      },
    });
  };

  return {
    evento,
    zonas,
    id,
    getEventoDetalle,
    handleComprar,
    formatFecha,
  };
};
