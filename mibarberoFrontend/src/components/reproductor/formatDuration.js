export function formatDuration(durationISO8601) {
    // Verificar si la entrada es una cadena
    if (typeof durationISO8601 !== "string") {
        console.error("La duración no es una cadena.");
        return "00:00";
    }

    // Extraer horas, minutos y segundos de la duración ISO 8601
    const duration = durationISO8601.substring(2); // Eliminar el prefijo "PT"
    const hours = parseInt(duration.split("H")[0]) || 0;
    const minutes = parseInt(duration.split("H")[1].split("M")[0]) || 0;
    const seconds = parseInt(duration.split("M")[1].split("S")[0]) || 0;

    // Formatear la duración en formato "HH:MM:SS"
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
