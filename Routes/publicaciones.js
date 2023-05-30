const express = require('express');
const router = express.Router();
const { validarJWT } = require('../Middlewares/validar-token');
const {
	obtenerPublicaciones,
	obtenerPublicacionPorId,
	crearPublicacion,
	obtenerPublicacionesPorUsuario,
	actualizarPublicacion,
	eliminarPublicacion,
} = require('../Controllers/publicaciones');

const { validarCampos } = require('../Middlewares/validar-campos');
const { check } = require('express-validator');

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const { subirArchivo } = require('../Controllers/upload');

router.use(validarJWT);

router.get('/', obtenerPublicaciones);
router.get('/:id', obtenerPublicacionPorId);
router.get('/user/:id', obtenerPublicacionesPorUsuario);
router.post(
	'/',
	upload.single('filename'),
	[
		check('idCreador', 'El id del creador es obligatorio').not().isEmpty(),
		check('numeroMeGustas', 'El numero de me gustas es obligatorio')
			.not()
			.isEmpty(),
		check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
		check('tags', 'Los tags son obligatorios').not().isEmpty(),
		validarCampos,
	],
	subirArchivo,
	crearPublicacion
);
router.put('/:id', actualizarPublicacion);
router.delete('/:id', eliminarPublicacion);

module.exports = router;
