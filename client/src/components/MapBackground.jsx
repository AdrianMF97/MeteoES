import { useState, useEffect } from "react";

const MapBackground = ({ darkMode }) => {
  const [index, setIndex] = useState(0);

  const images = {
    light: [
      "../../public/assets/light-background-1.webp",
      "../../public/assets/light-background-2.webp",
      "../../public/assets/light-background-3.webp",
    ],
    dark: [
      "../../public/assets/dark-background-1.webp",
      "../../public/assets/dark-background-2.webp",
      "../../public/assets/dark-background-3.webp",
    ],
  };

  const currentCollection = darkMode ? images.dark : images.light;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % currentCollection.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [currentCollection.length]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-900">
      {currentCollection.map((img, i) => (
        <div
          key={img}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-4000 ease-in-out transform ${
            i === index ? "opacity-100 scale-105" : "opacity-0 scale-100"
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      <div
        className={`absolute inset-0 transition-colors duration-1000 ${
          darkMode ? "bg-black/30" : "bg-white/10"
        }`}
      />
    </div>
  );
};

export default MapBackground;
