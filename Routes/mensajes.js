const express = require('express');
const router = express.Router();
const { validarJWT } = require('../Middlewares/validar-token');
const {
	obtenerMensajes,
	crearMensaje,
	actualizarMensaje,
	eliminarMensaje,
} = require('../Controllers/mensajes');

router.use(validarJWT);

router.get('/:id', obtenerMensajes);
router.post('/', crearMensaje);
router.put('/:id', actualizarMensaje);
router.delete('/:id', eliminarMensaje);

module.exports = router;
