const express = require('express');
const router = express.Router();

const { validarCampos } = require('../Middlewares/validar-campos');
const { check } = require('express-validator');

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const { subirArchivo } = require('../Controllers/upload');

const {
	crearUsuario,
	loginUsuario,
	revalidarToken,
} = require('../Controllers/auth');

const { validarJWT } = require('../Middlewares/validar-token');

router.post(
	'/',
	[
		check('user', 'El usuario es obligatorio').not().isEmpty(),
		check('password', 'La contraseña es obligatoria').not().isEmpty(),
		validarCampos,
	],
	loginUsuario
);

router.post(
	'/new',
	upload.single('filename'),
	[
		check('usuario', 'El usuario es obligatorio').not().isEmpty(),
		check('password', 'La contraseña es obligatoria').not().isEmpty(),
		check('nombre', 'El nombre es obligatorio').not().isEmpty(),
		check('correo', 'El correo es obligatoria').not().isEmpty(),
		check('tipo', 'El tipo de cuenta obligatoria').not().isEmpty(),
		validarCampos,
	],
	subirArchivo,
	crearUsuario
);
router.get('/renew', validarJWT, revalidarToken);

module.exports = router;
