const express = require('express');
const Comentario = require('../Models/ComentariosScheme');

const obtenerComentarios = async (req, res = express.request) => {
	try {
		const comentarios = await Comentario.find({
			idPublicacion: req.params.id,
		});

		res.status(200).json({
			ok: true,
			comentarios,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error Interno',
		});
	}
};

const crearComentario = async (req, res = express.request) => {
	try {
		let comentario = new Comentario(req.body);
		await comentario.save();

		res.status(200).json({
			ok: true,
			comentario,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			error,
		});
	}
};

const actualizarComentario = async (req, res = express.request) => {
	try {
		let comentario = await Comentario.findOneAndUpdate(
			{
				_id: req.params.id,
			},
			req.body,
			{
				returnOriginal: false,
			}
		).populate('Publicacion');

		if (!comentario) {
			return res.status(404).json({
				ok: false,
				msg: 'No se ha encontrado el comentario',
			});
		}

		res.status(200).json({
			ok: true,
			comentario,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			error,
		});
	}
};

const eliminarComentario = async (req, res = express.request) => {
	try {
		let comentario = await Comentario.deleteOne(
			{
				_id: req.params.id,
			},
			req.body
		).populate('Publicacion');

		if (!comentario) {
			return res.status(404).json({
				ok: false,
				msg: 'No se ha encontrado el comentario',
			});
		}
		res.status(200).json({
			ok: true,
			comentario,
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
	obtenerComentarios,
	crearComentario,
	actualizarComentario,
	eliminarComentario,
};
