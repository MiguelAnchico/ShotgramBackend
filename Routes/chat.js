const express = require('express');
const router = express.Router();
const { validarJWT } = require('../Middlewares/validar-token');
const {
	obtenerChats,
	obtenerChat,
	crearChat,
	eliminarChat,
} = require('../Controllers/chats');

router.use(validarJWT);

router.get('/usuario/:id', obtenerChats);
router.get('/:id', obtenerChat);
router.post('/', crearChat);
router.delete('/:id', eliminarChat);

module.exports = router;
