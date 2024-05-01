export function convertirDuracion(duracionISO8601) {
  let duracion = duracionISO8601.substring(2); // Eliminar el "PT" del inicio
  let horas = 0;
  let minutos = 0;
  let segundos = 0;

  if (duracion.includes("H")) {
    const horasString = duracion.split("H")[0];
    horas = parseInt(horasString);
    duracion = duracion.split("H")[1];
  }

  if (duracion.includes("M")) {
    const minutosString = duracion.includes("H")
      ? duracion.split("M")[0]
      : duracion.split("M")[0];
    minutos = parseInt(minutosString);
    duracion = duracionISO8601.substring(2);
  }

  if (duracion.includes("S")) {
    const segundosString = duracion.split("S")[0];
    segundos = parseInt(segundosString);
  }

  return `${horas.toString().padStart(2, "0")}:${minutos
    .toString()
    .padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
}
