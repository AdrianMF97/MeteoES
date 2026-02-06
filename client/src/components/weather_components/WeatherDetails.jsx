import { getDetailedPeriodData } from "../utils/weatherUtils";

const WeatherDetails = ({ hoy }) => {
  if (!hoy) return null;

  const dataActual = getDetailedPeriodData(hoy);

  const items = [
    {
      label: "Lluvia",
      value: `${dataActual.lluvia}%`,
      icon: "☔",
      context: dataActual.periodoLabel,
      isLive: true,
    },
    {
      label: "Viento",
      value: `${dataActual.vientoVel} km/h`,
      icon: "💨",
      context: dataActual.periodoLabel,
      isLive: true,
    },
    {
      label: "Humedad",
      value: `${hoy.humedadRelativa?.maxima || 0}%`,
      icon: "💧",
      context: "Máx. Hoy",
      isLive: false,
    },
    {
      label: "Índice UV",
      value: hoy.uvMax ?? "N/A",
      icon: "☀️",
      context: "Máx. Hoy",
      isLive: false,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 border-t border-gray-100 dark:border-gray-700 divide-x dark:divide-gray-700 divide-gray-100 bg-white dark:bg-transparent">
      {items.map((item, index) => (
        <div
          key={index}
          className="p-6 flex flex-col items-center justify-center gap-2 group hover:bg-gray-50 dark:hover:bg-white/5 transition-all relative overflow-hidden"
        >
          <span
            className={`text-[8px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-full mb-1 ${
              item.isLive
                ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
            }`}
          >
            {item.context}
          </span>

          <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
            {item.icon}
          </span>

          <div className="text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-0.5">
              {item.label}
            </p>
            <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
              {item.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeatherDetails;
