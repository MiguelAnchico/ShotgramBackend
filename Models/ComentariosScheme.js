const { Schema, model } = require('mongoose');

const ComentariosSchema = Schema(
	{
		idPublicacion: {
			type: Schema.Types.ObjectID,
			ref: 'Publicacion',
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
		padreComentario: {
			type: Schema.Types.ObjectID,
			ref: 'Comentario',
			require: false,
		},
	},
	{
		toJSON: {
			virtual: true,
		},
		toObject: {
			virtual: true,
		},
		collection: 'comentarios',
	}
);

ComentariosSchema.method('toJSON', function () {
	const { __v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});

module.exports = model('Comentario', ComentariosSchema);
