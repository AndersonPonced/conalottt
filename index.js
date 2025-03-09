const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para analizar el cuerpo de las solicitudes JSON
app.use(express.json());

// Middleware para analizar el cuerpo de las solicitudes urlencoded
app.use(express.urlencoded({ extended: true }));

// Endpoint POST para recibir datos de Make
app.post('/datos-make', (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      console.warn('Advertencia: Solicitud POST sin cuerpo de datos.');
      return res.status(400).send('Solicitud POST sin cuerpo de datos.');
    }

    const datos = req.body;
    console.log('Datos recibidos de Make:', datos);

    // Aquí puedes agregar lógica adicional para procesar los datos

    res.status(204).send(); // 204 No Content - Éxito, sin contenido en la respuesta
  } catch (error) {
    console.error('Error al procesar datos de Make:', error);
    res.status(500).send('Error interno del servidor.');
  }
});
app.get('/', (req, res) => {
  const serverInfo = {
    estado: 'activo',
    timestamp: new Date().toISOString(),
    servidor: {
      plataforma: process.platform,
      nodeVersion: process.version,
      memoria: {
        total: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)} MB`,
        usado: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`
      }
    },
    endpoints: {
      get: '/ - Muestra esta información',
      post: '/datos-make - Endpoint para recibir datos de Make'
    }
  };

  res.json(serverInfo);
});

app.listen(port, () => {
  console.log(`La API está escuchando en el puerto ${port}`);
});