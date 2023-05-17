const express = require('express');
const Publicacion = require('../Models/PublicacionesScheme');

const obtenerPublicaciones = async (req, res = express.request) => {
	try {
		const publicaciones = await Publicacion.find().populate('Usuario');

		res.status(200).json({
			ok: true,
			publicaciones,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error Interno',
		});
	}
};

const obtenerPublicacionPorId = async (req, res = express.request) => {
	try {
		let publicacion = await Publicacion.findOne({
			idPublicacion: req.params.id,
		}).populate('Usuario');
		if (!usuario) {
			return res.status(404).json({
				ok: false,
				msg: 'No se ha encontrado la publicacion',
			});
		}

		res.status(200).json({
			ok: true,
			publicacion,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			error,
		});
	}
};

const crearPublicacion = async (req, res = express.request) => {
	try {
		let publicacion = new Publicacion(req.body);
		await publicacion.save();

		res.status(200).json({
			ok: true,
			publicacion,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			error,
		});
	}
};

/*const actualizarPublicacion = async(req, (res = express.request) => {});

const eliminarPublicacion = async(req, (res = express.request) => {});
*/
module.exports = {
	obtenerPublicacionPorId,
	obtenerPublicaciones,
	crearPublicacion,
};
