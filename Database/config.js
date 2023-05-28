const mongoose = require('mongoose');

const dbConnection = async () => {
	try {
		mongoose.set('strictPopulate', false);

		mongoose.connect(process.env.DB_CONNECTION, {
			autoIndex: true,
		});

		console.log('DB Online');
	} catch (error) {
		console.log(error);
		throw new Error('Error al conectar en DB');
	}
};

module.exports = { dbConnection };
