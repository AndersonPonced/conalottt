const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Almacenamiento temporal en memoria
let registros = [];

// Middleware para analizar el cuerpo de las solicitudes JSON
app.use(express.json());

// Middleware para analizar el cuerpo de las solicitudes urlencoded
app.use(express.urlencoded({ extended: true }));

// Agregar CORS para permitir peticiones desde otra página
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Endpoint POST para recibir datos de Make
app.post('/datos-make', (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      console.warn('Advertencia: Solicitud POST sin cuerpo de datos.');
      return res.status(400).json({ error: 'Solicitud POST sin cuerpo de datos.' });
    }

    const nuevoRegistro = {
      nombre: req.body.nombre || '',
      apellido: req.body.apellido || '',
      cedula: req.body.cedula || '',
      fechaNacimiento: req.body.fechaNacimiento || '',
      email: req.body.email || '',
      telefono: req.body.telefono || '',
      naturalDe: req.body.naturalDe || '',
      nacionalidad: req.body.nacionalidad || '',
      direccion: req.body.direccion || '',
      estatura: req.body.estatura || '',
      peso: req.body.peso || '',
      contextura: req.body.contextura || '',
      colorOjos: req.body.colorOjos || '',
      colorCabello: req.body.colorCabello || '',
      lee: req.body.lee || false,
      escribe: req.body.escribe || false,
      religion: req.body.religion || '',
      observaciones: req.body.observaciones || '',
      nombrePadre: req.body.nombrePadre || '',
      nombreMadre: req.body.nombreMadre || '',
      tieneHijos: req.body.tieneHijos || false,
      cantidadHijos: req.body.cantidadHijos || 0,
      nombresHijos: req.body.nombresHijos || '',
      nombreRifa: req.body.nombreRifa || '',
      premios: req.body.premios || '',
      fechaInicio: req.body.fechaInicio || '',
      fechaFin: req.body.fechaFin || '',
      tipoLotería: req.body.tipoLotería || '',
      fotografia: req.body.fotografia || '',
      fechaRegistro: new Date().toISOString()
    };

    registros.unshift(nuevoRegistro);
    
    if (registros.length > 100) {
      registros = registros.slice(0, 100);
    }

    res.status(200).json(nuevoRegistro);
  } catch (error) {
    console.error('Error al procesar datos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/', (req, res) => {
  res.json(registros);
});

app.listen(port, () => {
  console.log(`La API está escuchando en el puerto ${port}`);
});