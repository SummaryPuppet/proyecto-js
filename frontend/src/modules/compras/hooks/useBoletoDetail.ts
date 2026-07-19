import { useParams, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useAuth } from "../../../shared/hooks/useAuth";
import { obtenerCompraPorId } from "../../../shared/utils/comprasStorage";
import { formatFecha } from "../../../shared/utils/formatFecha";
import type { BoletoDetalle } from "../interfaces/BoletoDetailTypes";

const generateCodigoBoleto = (id: number): string => {
  const prefix = "TKT";
  const timestamp = id.toString(36).toUpperCase().slice(-4);
  const array = new Uint8Array(4);
  crypto.getRandomValues(array);
  const random = Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("").toUpperCase().slice(0, 4);
  return `${prefix}-${timestamp}-${random}`;
};

export const useBoletoDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const boleto: BoletoDetalle | null = useMemo(() => {
    if (!id) return null;
    const compra = obtenerCompraPorId(Number(id));
    if (!compra) return null;

    return {
      ...compra,
      codigoBoleto: generateCodigoBoleto(compra.idCompra),
    };
  }, [id]);

  const handleVolver = () => navigate("/ver-boletos");

  return {
    boleto,
    isAuthenticated,
    id,
    handleVolver,
    formatFecha,
  };
};
