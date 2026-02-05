import { getWeatherIcon, formatDayName } from "./weatherUtils";

const ForecastRow = ({ dias }) => {
  if (!dias || dias.length === 0) return null;

  return (
    <div className="mt-6">
      <h4 className="px-2 mb-4 text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-300">
        Próximos {dias.length} días
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {dias.map((dia, idx) => {
          const estado =
            dia.estadoCielo?.find((e) => e.descripcion) || dia.estadoCielo?.[0];
          const descripcion = estado?.descripcion || "";

          return (
            <div
              key={idx}
              className="flex flex-col items-center p-4 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 transition-all cursor-default"
            >
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">
                {formatDayName(dia.fecha)}
              </span>
              <span className="text-3xl mb-2 filter drop-shadow-sm">
                {getWeatherIcon(descripcion)}
              </span>
              <div className="flex gap-1 items-baseline">
                <span className="text-lg font-bold text-gray-800 dark:text-white">
                  {dia.temperatura.maxima}º
                </span>
                <span className="text-xs font-semibold text-gray-400">
                  /{dia.temperatura.minima}º
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastRow;
