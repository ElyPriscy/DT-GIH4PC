require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
const nodemailer = require('nodemailer');
// const configMensaje = require('./middlewares/configMensaje');



// Crear servidor de express
const app = express();

// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

//Base de Datos
dbConnection();

// Directorio publico
app.use(express.static('public'));

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/upload', require('./routes/uploads'));
app.use('/api/cuestionarios', require('./routes/cuestionarios'));
app.use('/api/respuestaCuestionarios', require('./routes/respuestaCuestionario'));
app.use('/api/post', require('./routes/post'));
//app.use('/api/estadisticas', require('./routes/respuestaCuestionario'));
// app.use('/api/respuestas', require('./routes/respuestas'));


/* app.post('/formulario', (req, res) => {
    configMensaje(req.body);
    res.status(200).send();
   })
 */


//levantar el servidor
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto: ' + process.env.PORT);
})