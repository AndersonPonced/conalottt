const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/datos-make', (req, res) => {
  try {
    const datos = req.body;
    console.log('Datos recibidos de Make:', datos);
    res.status(204).send();
  } catch (error) {
    console.error('Error al procesar datos de Make:', error);
    res.status(500).send('Error interno del servidor.');
  }
});

app.listen(port, () => {
  console.log(`La API está escuchando en el puerto ${port}`);
});