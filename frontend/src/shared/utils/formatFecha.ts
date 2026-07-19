type FormatoFecha = "corto" | "largo";

export const formatFecha = (fecha: string, hora?: string, formato: FormatoFecha = "largo"): string => {
  const fechaCompleta = hora ? `${fecha}T${hora}` : fecha;
  const date = new Date(fechaCompleta);

  if (formato === "corto") {
    return date.toLocaleDateString("es-PE", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  }

  return date.toLocaleDateString("es-PE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
