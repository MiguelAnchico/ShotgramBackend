const express = require('express');
const router = express.Router();
const { validarJWT } = require('../Middlewares/validar-token');
const {
	obtenerUsuarios,
	obtenerUsuario,
	eliminarUsuario,
	actualizarUsuario,
} = require('../Controllers/usuarios');

router.use(validarJWT);

router.get('/', obtenerUsuarios);
router.get('/:id', obtenerUsuario);
router.put('/', actualizarUsuario);
router.delete('/:id', eliminarUsuario);

module.exports = router;
