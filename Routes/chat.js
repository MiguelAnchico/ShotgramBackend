const express = require('express');
const router = express.Router();
const { validarJWT } = require('../Middlewares/validar-token');
const {
	obtenerChats,
	obtenerChat,
	crearChat,
	eliminarChat,
} = require('../Controllers/chats');

const { validarCampos } = require('../Middlewares/validar-campos');
const { check } = require('express-validator');

router.use(validarJWT);

router.get('/usuario/:id', obtenerChats);
router.get('/:id', obtenerChat);
router.post(
	'/',
	[
		check('participantes', 'Los participantes son obligatorios')
			.not()
			.isEmpty(),
		validarCampos,
	],
	crearChat
);
router.delete('/:id', eliminarChat);

module.exports = router;
