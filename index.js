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
      // Datos personales básicos
      nombre: req.body.nombre || '',
      apellido: req.body.apellido || '',
      cedula: req.body.cedula || '',
      fechaNacimiento: req.body.fechaNacimiento || '',
      email: req.body.email || '',
      telefono: req.body.telefono || '',
      
      // Lugar de origen
      naturalDe: req.body.naturalDe || '',
      nacionalidad: req.body.nacionalidad || '',
      direccion: req.body.direccion || '',
      
      // Características físicas
      estatura: req.body.estatura || '',
      peso: req.body.peso || '',
      contextura: req.body.contextura || '',
      colorOjos: req.body.colorOjos || '',
      colorCabello: req.body.colorCabello || '',
      
      // Educación y religión
      lee: Boolean(req.body.lee),
      escribe: Boolean(req.body.escribe),
      religion: req.body.religion || '',
      
      // Observaciones
      observaciones: req.body.observaciones || '',
      
      // Datos familiares
      nombrePadre: req.body.nombrePadre || '',
      nombreMadre: req.body.nombreMadre || '',
      tieneHijos: Boolean(req.body.tieneHijos),
      cantidadHijos: parseInt(req.body.cantidadHijos) || 0,
      nombresHijos: req.body.nombresHijos || '',
      
      // Datos de la rifa
      nombreRifa: req.body.nombreRifa || '',
      premios: req.body.premios || '',
      fechaInicio: req.body.fechaInicio || '',
      fechaFin: req.body.fechaFin || '',
      tipoLotería: req.body.tipoLotería || '',
      
      // Fotografía
      fotografia: req.body.fotografia || '',

      // Metadata
      fechaRegistro: new Date()
    };

    registros.unshift(nuevoRegistro);
    
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
  const registrosLimpios = registros.map(registro => {
    return {
      datosPersonales: {
        nombre: registro.nombre,
        apellido: registro.apellido,
        cedula: registro.cedula,
        fechaNacimiento: registro.fechaNacimiento,
        email: registro.email,
        telefono: registro.telefono
      },
      lugarOrigen: {
        naturalDe: registro.naturalDe,
        nacionalidad: registro.nacionalidad,
        direccion: registro.direccion
      },
      caracteristicasFisicas: {
        estatura: registro.estatura,
        peso: registro.peso,
        contextura: registro.contextura,
        colorOjos: registro.colorOjos,
        colorCabello: registro.colorCabello
      },
      educacionReligion: {
        lee: registro.lee,
        escribe: registro.escribe,
        religion: registro.religion
      },
      observaciones: registro.observaciones,
      datosFamiliares: {
        nombrePadre: registro.nombrePadre,
        nombreMadre: registro.nombreMadre,
        tieneHijos: registro.tieneHijos,
        cantidadHijos: registro.cantidadHijos,
        nombresHijos: registro.nombresHijos
      },
      datosRifa: {
        nombreRifa: registro.nombreRifa,
        premios: registro.premios,
        fechaInicio: registro.fechaInicio,
        fechaFin: registro.fechaFin,
        tipoLotería: registro.tipoLotería
      },
      fotografia: registro.fotografia,
      fechaRegistro: registro.fechaRegistro
    };
  });

  res.json({
    totalRegistros: registrosLimpios.length,
    registros: registrosLimpios
  });
});

app.listen(port, () => {
  console.log(`La API está escuchando en el puerto ${port}`);
});