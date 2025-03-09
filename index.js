const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Endpoint GET para recibir datos de Make
app.get('/datos-make', (req, res) => {
  try {
    const datos = req.query; // Los datos de GET se obtienen de req.query

    if (!datos || Object.keys(datos).length === 0) {
      console.log('Advertencia: No se recibieron datos de Make.');
      return res.status(400).send('No se recibieron datos.');
    }

    console.log('Datos recibidos de Make:', datos);

    // Aquí puedes agregar lógica adicional para procesar los datos

    res.status(200).json(datos); // 200 OK - Éxito, devolvemos los datos recibidos
  } catch (error) {
    console.error('Error al procesar datos de Make:', error);
    res.status(500).send('Error interno del servidor.');
  }
});

app.listen(port, () => {
  console.log(`La API está escuchando en el puerto ${port}`);
});