const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Almacenamiento temporal en memoria
let registros = [];

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

    const nuevoRegistro = {
      id: req.body['ID (A)'],
      nombreApellido: req.body['Nombre y Apellido (B)'],
      cedula: req.body['cedula (C)'],
      correo: req.body['correo (D)'],
      telefono: req.body['telefono (E)'],
      rs: req.body['RS (F)'],
      fechaNacimiento: req.body['Fecha de nacimiento (G)'],
      tipoPersona: req.body['persona Natural/Juridica (H)'],
      nacionalidad: req.body['Nacionalidad (I)'],
      estatura: req.body['Estatura (J)'],
      peso: req.body['Peso (K)'],
      contextura: req.body['Contextura (L)'],
      colorOjos: req.body['Color de ojos (M)'],
      colorCabello: req.body['Color de cabello (N)'],
      leeEscribe: req.body['Lee y Escribe (O)'],
      religion: req.body['Religión (P)'],
      observaciones: req.body['Observaciones (Q)'],
      nombrePadre: req.body['Nombre del padre (R)'],
      nombreMadre: req.body['Nombre de la madre (S)'],
      tieneHijos: req.body['Hijos (T)'],
      cantidadHijos: req.body['Cantidad (U)'],
      nombresHijos: req.body['Nombre de los hijos (V)'],
      nombreRifa: req.body['Nombre de la rifa (W)'],
      premios: req.body['Premios (X)'],
      direccion: req.body['Dirección (Y)'],
      fechasRifa: req.body['Fecha de incio y finalización (Z)'],
      fechaRegistro: new Date()
    };

    // Agregar el nuevo registro al array
    registros.unshift(nuevoRegistro); // Agregar al inicio del array
    
    // Mantener solo los últimos 100 registros (opcional)
    if (registros.length > 100) {
      registros = registros.slice(0, 100);
    }

    console.log('Datos recibidos:', nuevoRegistro);
    res.status(200).json(nuevoRegistro);
  } catch (error) {
    console.error('Error al procesar datos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/', (req, res) => {
  res.json({
    totalRegistros: registros.length,
    registros: registros
  });
});

app.listen(port, () => {
  console.log(`La API está escuchando en el puerto ${port}`);
});