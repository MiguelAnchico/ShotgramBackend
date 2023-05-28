const express = require('express');
const Mensaje = require('../Models/MensajesScheme');

const obtenerMensajes = async (req, res = express.request) => {
	try {
		const mensajes = await Mensaje.find({
			idChat: req.params.id,
		});

		res.status(200).json({
			ok: true,
			mensajes,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error Interno',
		});
	}
};

const crearMensaje = async (req, res = express.request) => {
	try {
		let mensaje = new Mensaje(req.body);
		await mensaje.save();

		res.status(200).json({
			ok: true,
			mensaje,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			error,
		});
	}
};

const actualizarMensaje = async (req, res = express.request) => {
	try {
		let mensaje = await Mensaje.findOneAndUpdate(
			{
				_id: req.params.id,
			},
			req.body,
			{
				returnOriginal: false,
			}
		);

		if (!mensaje) {
			return res.status(404).json({
				ok: false,
				msg: 'No se ha encontrado el mensaje',
			});
		}

		res.status(200).json({
			ok: true,
			mensaje,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			error,
		});
	}
};

const eliminarMensaje = async (req, res = express.request) => {
	try {
		let mensaje = await Mensaje.deleteOne(
			{
				_id: req.params.id,
			},
			req.body
		);

		if (!mensaje) {
			return res.status(404).json({
				ok: false,
				msg: 'No se ha encontrado el mensaje',
			});
		}
		res.status(200).json({
			ok: true,
			mensaje,
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
	obtenerMensajes,
	crearMensaje,
	actualizarMensaje,
	eliminarMensaje,
};
