let chats = {};

const socketController = (socket, io) => {
	socket.on('welcome', (user) => {
		// Crea la sala del restaurante o añade el socket
		let room = user.idChat;
		// Crea la sala del restaurante o añade el socket
		if (!socket.room) {
			if (chats[room]) chats[room].push(socket);
			else chats[room] = [socket];
			// Guardar Parametros del Socket
			socket.name = user.name;
			socket.room = room;
		}

		socket.name = user.name;

		// Avisar del cambio de la Lista de Usuarios
		const lista = chats[room].map((usuario) => usuario.name);
		io.emit('lista-usuarios', { room, lista });
	});

	socket.on('message', (msg) => {
		// Enviar Mensaje
		let room = chats[socket.room];
		room.forEach((client) => {
			client.emit('message', msg);
		});
	});

	const leave = () => {
		// Socket Invalido en el Chat
		if (!(socket.room && chats[socket.room])) return;

		// Borra el Usuario del Chat
		let room = chats[socket.room];
		for (let idx = 0; idx < room.length; idx++) {
			const current = room[idx];
			if (current == socket) room.splice(idx, 1);
		}

		if (room.length == 0) {
			delete socket.room;
			return;
		}

		// Avisar del cambio de la Lista de Usuarios
		const lista = chats[socket.room].map((x) => x.name);
		io.emit('lista-usuarios', { room: socket.room, lista });
		// Quita el room del socket
	};

	socket.on('disconnect', leave);
};

module.exports = { socketController };
