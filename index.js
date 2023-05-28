const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./Database/config');
const cors = require('cors');

// Importamos los modelos
require('./Models/UsuarioScheme');
require('./Models/PublicacionesScheme');

// Creamos el servidor con express
const app = express();

// Nos conectamos a la base de datos
dbConnection();

// Creamos CORS
app.use(cors());

// Creamos carpeta estatica
app.use(express.static('public'));

// Parseamos el body para los json
app.use(express.json());

// Rutas
app.use('/api/auth', require('./Routes/auth'));
app.use('/api/publicaciones', require('./Routes/publicaciones'));

// Ponemos a escuchar en el puerto 4000
app.listen(process.env.PORT, () => {
	console.log('Servidor corriendo en puerto ', process.env.PORT);
});
