const express = require('express');
const router = express.Router();
const { validarJWT } = require('../Middlewares/validar-token');
const {
	obtenerComentarios,
	crearComentario,
	actualizarComentario,
	eliminarComentario,
} = require('../Controllers/comentarios');

router.use(validarJWT);

router.get('/:id', obtenerComentarios);
router.post('/', crearComentario);
router.put('/:id', actualizarComentario);
router.delete('/:id', eliminarComentario);

module.exports = router;
