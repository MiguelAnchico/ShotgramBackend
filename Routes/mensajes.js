const express = require('express');
const router = express.Router();
const { validarJWT } = require('../Middlewares/validar-token');
const {
	obtenerMensajes,
	crearMensaje,
	actualizarMensaje,
	eliminarMensaje,
} = require('../Controllers/mensajes');

const { validarCampos } = require('../Middlewares/validar-campos');
const { check } = require('express-validator');

router.use(validarJWT);

router.get('/:id', obtenerMensajes);
router.post(
	'/',
	[
		check('idChat', 'El id del chat es obligatorio').not().isEmpty(),
		check('idCreador', 'El id del creador es obligatorio').not().isEmpty(),
		check('contenido', 'El contenido es obligatorio').not().isEmpty(),
		validarCampos,
	],
	crearMensaje
);
router.put('/:id', actualizarMensaje);
router.delete('/:id', eliminarMensaje);

module.exports = router;
