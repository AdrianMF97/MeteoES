// Importar dependencias
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Endpoint de bienvenida
app.get("/", (req, res) => {
  res.send(`
    <div style="font-family: sans-serif; text-align: center; padding: 50px;">
      <h1>🌤️ MeteoES API Backend</h1>
      <p>El servidor está funcionando correctamente.</p>
      </p>
    </div>
  `);
});

// Status endpoint
app.get("/api/status", (req, res) => {
  res.json({
    success: true,
    mensaje: "Servidor Meteorológico activo",
    time: new Date().toLocaleString(),
  });
});

// Endpoint principal para obtener datos meteorológicos
app.get("/api/tiempo/:codigoMunicipio", async (req, res) => {
  try {
    const { codigoMunicipio } = req.params;
    const apiKey = process.env.AEMET_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        error: "Falta la API KEY en el archivo .env del servidor",
      });
    }

    const urlAemet = `https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/${codigoMunicipio}`;

    const response1 = await fetch(urlAemet, {
      method: "GET",
      headers: {
        api_key: apiKey,
        "Content-Type": "application/json",
      },
    });

    if (!response1.ok) {
      throw new Error(`Error conexión AEMET:${response1.status}`);
    }

    const json1 = await response1.json();

    // Respuesta de AEMET
    if (json1.estado !== 200) {
      return res.status(400).json({
        success: false,
        error: "Municipio no encontrado o error en AEMET",
        detalles: json1.descripcion,
      });
    }

    const urlDatos = json1.datos;
    const response2 = await fetch(urlDatos);

    if (!response2.ok) {
      throw new Error(`Error conexión AEMET: ${response2.status}`);
    }

    const datosFinales = await response2.json();

    res.json({
      success: true,
      data: datosFinales,
    });
  } catch (error) {
    console.error("Error en el servidor:", error.message);
    res.status(500).json({
      success: false,
      error: "Error interno al obtener datos meteorológicos",
      detalles: error.message,
    });
  }
});

// 404 endpoint
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "La ruta solicitada no existe",
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor MeteoES corriendo en http://localhost:${PORT}`);
  console.log(
    `📡 Endpoint de prueba: http://localhost:${PORT}/api/tiempo/30017`,
  );
});
