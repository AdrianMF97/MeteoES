// Constantes para mapear descripciones a iconos
const WEATHER_RULES = [
  { keywords: ["tormenta"], icon: "⛈️" },
  { keywords: ["lluvia", "chubasco"], icon: "🌧️" },
  { keywords: ["nieve"], icon: "🌨️" },
  { keywords: ["muy nuboso", "cubierto"], icon: "☁️" },
  { keywords: ["nuboso", "intervalos", "nubes"], icon: "⛅" },
];

// Función para obtener el icono basado en la descripción
export const getWeatherIcon = (desc) => {
  const d = desc?.toLowerCase() || "";
  const match = WEATHER_RULES.find((rule) =>
    rule.keywords.some((key) => d.includes(key)),
  );
  return match ? match.icon : "☀️";
};

// Función auxiliar para formatear el nombre del día
export const formatDayName = (dateStr) => {
  if (!dateStr) return "";
  return new Intl.DateTimeFormat("es-ES", { weekday: "short" })
    .format(new Date(dateStr))
    .replace(".", ""); // Elimina el punto que pone Intl en algunos navegadores
};

// Función auxiliar para obtener la probabilidad de precipitación
export const getProbPrecipitacion = (probArray, periodo = "00-24") => {
  if (!Array.isArray(probArray)) return 0;
  const prob = probArray.find((p) => p.periodo === periodo);
  return prob ? prob.value : probArray[0]?.value || 0;
};

// Función auxiliar para obtener la evolución horaria del día
export const getHourlyEvolution = (dia) => {
  if (!dia) return [];

  const DAY_PERIODS = {
    "00-06": "Madrugada",
    "06-12": "Mañana",
    "12-18": "Tarde",
    "18-24": "Noche",
  };

  return Object.entries(DAY_PERIODS).map(([p, label]) => {
    // Buscamos los datos del periodo actual
    const estado = dia.estadoCielo?.find((e) => e.periodo === p);
    const lluvia = dia.probPrecipitacion?.find((prob) => prob.periodo === p);

    return {
      periodo: p,
      label,
      icono: getWeatherIcon(estado?.descripcion),
      probLluvia: lluvia?.value || 0,
    };
  });
};

// Funcion auxiliar para obtener la velocidad del viento
export const getVientoVelocidad = (vientoArray) => {
  if (!Array.isArray(vientoArray) || vientoArray.length === 0) return 0;
  const vientoData =
    vientoArray.find((v) => v.periodo === "00-24") || vientoArray[0];
  return vientoData?.velocidad || 0;
};

// Función para determinar el periodo actual basado en la hora
export const getCurrentPeriod = () => {
  const hour = new Date().getHours();
  if (hour >= 0 && hour < 6) return "00-06";
  if (hour >= 6 && hour < 12) return "06-12";
  if (hour >= 12 && hour < 18) return "12-18";
  return "18-24";
};

// Función para obtener datos detallados del periodo actual
export const getDetailedPeriodData = (dia) => {
  if (!dia) return null;

  const p = getCurrentPeriod();

  // Buscamos los datos específicos del tramo actual
  const lluvia =
    dia.probPrecipitacion?.find((item) => item.periodo === p)?.value || 0;
  const viento =
    dia.viento?.find((item) => item.periodo === p) || dia.viento?.[0];
  const humedad =
    dia.humedadRelativa?.dato?.find(
      (item) => item.hora === new Date().getHours(),
    ) || dia.humedadRelativa; // Fallback a humedadRelativa general si no hay datos por hora

  return {
    periodoLabel:
      p === "00-06"
        ? "Madrugada"
        : p === "06-12"
          ? "Mañana"
          : p === "12-18"
            ? "Tarde"
            : "Noche",
    lluvia,
    vientoVel: viento?.velocidad || 0,
    humedad: humedad?.maxima || humedad?.value || 0,
  };
};

// Función para obtener el código INE a partir de un nombre o código
export const getIneCode = (input, listaMunicipios) => {
  // Si ya es un código de 5 dígitos, lo devolvemos tal cual
  if (/^\d{5}$/.test(input)) return input;

  // Si es texto, buscamos el municipio en la lista
  const municipio = listaMunicipios.find(
    (m) => m.nombre.toLowerCase() === input.toLowerCase(),
  );

  return municipio ? municipio.codigo : null;
};
