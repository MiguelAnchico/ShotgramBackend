const express = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../Models/UsuarioScheme');
const { generarJWT } = require('../Helpers/jwt');

const crearUsuario = async (req, res = express.request) => {
	const { nombre, correo, password, user, descripcion, tipo } = req.body;

	try {
		let usuarioExistente = await Usuario.findOne({ usuario: user });
		if (usuarioExistente) {
			return res.status(400).json({
				ok: false,
				msg: 'El usuario ya existe',
			});
		}
		usuarioExistente = await Usuario.findOne({ correo: correo });
		if (usuarioExistente) {
			return res.status(400).json({
				ok: false,
				msg: 'El usuario con ese correo ya existe',
			});
		}

		usuario = new Usuario(req.body);
		const salt = bcrypt.genSaltSync();
		usuario.password = bcrypt.hashSync(password, salt);
		await usuario.save();

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

const loginUsuario = async (req, res = express.request) => {
	const { user, password } = req.body;

	try {
		let usuario = await Usuario.findOne({ usuario: user });
		if (!usuario) {
			return res.status(400).json({
				ok: false,
				msg: 'El usuario o la contraseña no coinciden',
			});
		}

		const passwordValid = bcrypt.compareSync(password, usuario.password);
		if (!passwordValid) {
			return res.status(400).json({
				ok: false,
				msg: 'El usuario o la contraseña no coinciden',
			});
		}

		const token = await generarJWT(usuario.user, usuario.tipo);

		res.status(200).json({
			ok: true,
			usuario,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			error,
		});
	}
};

const revalidarToken = (req, res = express.request) => {
	const { uid, name } = req;

	const token = await(generarJWT(uid, name));

	res.json({
		ok: true,
		token,
	});
};

module.exports = {
	loginUsuario,
	crearUsuario,
	revalidarToken,
};
