const express = require('express');
const Usuario = require('../Models/UsuarioScheme');
const Publicacion = require('../Models/PublicacionesScheme');

const obtenerUsuarios = async (req, res = express.request) => {
	try {
		const usuarios = await Usuario.find().select('-password');

		res.status(200).json({
			ok: true,
			usuarios,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error Interno',
		});
	}
};

const obtenerUsuario = async (req, res = express.request) => {
	try {
		let usuario = await Usuario.findOne({
			_id: req.params.id,
		}).select('-password');

		const publicaciones = await Publicacion.find({ idCreador: usuario.id });

		if (!usuario) {
			return res.status(404).json({
				ok: false,
				msg: 'No se ha encontrado la publicacion',
			});
		}

		res.status(200).json({
			ok: true,
			usuario,
			publicaciones,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			error,
		});
	}
};

const eliminarUsuario = async (req, res = express.request) => {
	try {
		const usuario = await Usuario.deleteOne({ _id: req.params.id });

		res.status(200).json({
			ok: true,
			usuario,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error Interno',
		});
	}
};
const actualizarUsuario = async (req, res = express.request) => {
	try {
		let usuario = await Usuario.findOneAndUpdate(
			{
				_id: req.params.id,
			},
			req.body,
			{
				returnOriginal: false,
			}
		);

		if (!usuario) {
			return res.status(404).json({
				ok: false,
				msg: 'No se ha encontrado la publicacion',
			});
		}

		res.status(200).json({
			ok: true,
			usuario,
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
	obtenerUsuarios,
	obtenerUsuario,
	eliminarUsuario,
	actualizarUsuario,
};
