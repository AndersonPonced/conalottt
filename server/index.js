const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para analizar el cuerpo de las solicitudes JSON
app.use(express.json());

// Middleware para analizar el cuerpo de las solicitudes urlencoded
app.use(express.urlencoded({ extended: true }));

// Endpoint POST para recibir datos de Make
app.post('/datos-make', (req, res) => {
  const datos = req.body;

  console.log('Datos recibidos de Make:', datos);

  // Envía un código de estado 204 (No Content)
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`La API está escuchando en el puerto ${port}`);
});

