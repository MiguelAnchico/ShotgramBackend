const { Schema, model } = require('mongoose');

const MensajesSchema = Schema(
	{
		idChat: {
			type: Schema.Types.ObjectID,
			ref: 'Chat',
		},
		fechaPublicacion: {
			type: Date,
			default: Date.now(),
		},
		idCreador: {
			type: Schema.Types.ObjectID,
			ref: 'Usuario',
		},
		contenido: {
			type: String,
			require: true,
		},
	},
	{
		toJSON: {
			virtual: true,
		},
		toObject: {
			virtual: true,
		},
		collection: 'mensajes',
	}
);

MensajesSchema.method('toJSON', function () {
	const { __v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});

module.exports = model('Mensajes', MensajesSchema);
