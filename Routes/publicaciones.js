const express = require('express');
const router = express.Router();
const { validarJWT } = require('../Middlewares/validar-token');
const {
	obtenerPublicaciones,
	obtenerPublicacionPorId,
	crearPublicacion,
} = require('../Controllers/publicaciones');

router.use(validarJWT);

router.get('/', obtenerPublicaciones);
router.get('/:id', obtenerPublicacionPorId);
router.post('/', crearPublicacion);
/*router.put('/:id', actualizarPublicacion);
router.delete('/:id', eliminarPublicacion);*/

module.exports = router;
