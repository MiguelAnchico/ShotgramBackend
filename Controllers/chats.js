const express = require('express');
const Chat = require('../Models/ChatScheme');

const obtenerChats = async (req, res = express.request) => {
	try {
		const chats = await Chat.find({ participantes: req.params.id });

		res.status(200).json({
			ok: true,
			chats,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error Interno',
		});
	}
};

const obtenerChat = async (req, res = express.request) => {
	try {
		const chat = await Chat.findOne({ _id: req.params.id });

		if (!chat) {
			return res.status(404).json({
				ok: false,
				msg: 'No se ha encontrado el chat',
			});
		}

		res.status(200).json({
			ok: true,
			chat,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error Interno',
		});
	}
};

const crearChat = async (req, res = express.request) => {
	try {
		let chat = new Chat(req.body);
		await chat.save();

		res.status(200).json({
			ok: true,
			chat,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			error,
		});
	}
};

const eliminarChat = async (req, res = express.request) => {
	try {
		let chat = await Chat.deleteOne({
			_id: req.params.id,
		});

		if (!chat) {
			return res.status(404).json({
				ok: false,
				msg: 'No se ha encontrado el chat',
			});
		}
		res.status(200).json({
			ok: true,
			chat,
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
	obtenerChats,
	obtenerChat,
	crearChat,
	eliminarChat,
};
