const express = require('express');
const router = express.Router();
const { validarJWT } = require('../Middlewares/validar-token');
const {
	obtenerComentarios,
	crearComentario,
	actualizarComentario,
	eliminarComentario,
} = require('../Controllers/comentarios');

const { validarCampos } = require('../Middlewares/validar-campos');
const { check } = require('express-validator');

router.use(validarJWT);

router.get('/:id', obtenerComentarios);
router.post(
	'/',
	[
		check('idPublicacion', 'El id de la publicación es obligatoria')
			.not()
			.isEmpty(),
		check('idCreador', 'El id del creador es obligatorio').not().isEmpty(),
		check('contenido', 'El contenido es obligatorio').not().isEmpty(),
		validarCampos,
	],
	crearComentario
);
router.put('/:id', actualizarComentario);
router.delete('/:id', eliminarComentario);

module.exports = router;
