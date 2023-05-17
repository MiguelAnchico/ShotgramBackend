const express = require('express');
const router = express.Router();

const {
	crearUsuario,
	loginUsuario,
	revalidarToken,
} = require('../Controllers/auth');

const { validarJWT } = require('../Middlewares/validar-token');

router.post('/', loginUsuario);

router.post('/new', crearUsuario);
router.get('/renew', validarJWT, revalidarToken);

module.exports = router;
