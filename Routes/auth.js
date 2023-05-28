const express = require('express');
const router = express.Router();

const { validarCampos } = require('../Middlewares/validar-campos');
const { check } = require('express-validator');

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
	[
		check('user', 'El usuario es obligatorio').not().isEmpty(),
		check('password', 'La contraseña es obligatoria').not().isEmpty(),
		check('nombre', 'El nombre es obligatorio').not().isEmpty(),
		check('correo', 'El correo es obligatoria').not().isEmpty(),
		check('imagen', 'La imagen de perfil es obligatoria').not().isEmpty(),
		check('tipo', 'El tipo de cuenta obligatoria').not().isEmpty(),
		validarCampos,
	],
	crearUsuario
);
router.get('/renew', validarJWT, revalidarToken);

module.exports = router;
