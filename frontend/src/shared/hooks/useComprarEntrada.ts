import { useNavigate } from "react-router-dom";
import type { TicketPurchaseData } from "../interfaces/SharedTypes";

export const useComprarEntrada = () => {
  const navigate = useNavigate();
  const comprarEntrada = ({
    evento,
    fecha,
    lugar,
    zona,
    tipo,
    precio,
  }: TicketPurchaseData): void => {
    navigate("/compras", {
      state: {
        evento,
        fecha,
        lugar,
        zona,
        tipo,
        precio,
      },
    });
  };

  return { comprarEntrada };
};
