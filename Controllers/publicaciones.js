const express = require('express');
const Publicacion = require('../Models/PublicacionesScheme');

const options = {
	limit: 5,
	populate: 'idCreador',
};

const obtenerPublicaciones = async (req, res = express.request) => {
	try {
		const page = req?.query?.page ? req.query.page : 1;
		options['page'] = page;

		const publicaciones = await Publicacion.paginate({}, options);

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
			_id: req.params.id,
		}).populate('Usuario');

		if (!publicacion) {
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

const obtenerPublicacionesPorUsuario = async (req, res = express.request) => {
	try {
		const page = req?.query?.page ? req.query.page : 1;
		options['page'] = page;

		const publicaciones = await Publicacion.paginate(
			{ idCreador: req.params.id },
			options
		);

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

const actualizarPublicacion = async (req, res = express.request) => {
	try {
		let publicacion = await Publicacion.findOneAndUpdate(
			{
				_id: req.params.id,
			},
			req.body,
			{
				returnOriginal: false,
			}
		).populate('Usuario');

		if (!publicacion) {
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

const eliminarPublicacion = async (req, res = express.request) => {
	try {
		let publicacion = await Publicacion.deleteOne(
			{
				_id: req.params.id,
			},
			req.body
		).populate('Usuario');

		if (!publicacion) {
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

module.exports = {
	obtenerPublicacionPorId,
	obtenerPublicaciones,
	crearPublicacion,
	obtenerPublicacionesPorUsuario,
	actualizarPublicacion,
	eliminarPublicacion,
};
