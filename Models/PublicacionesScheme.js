const { Schema, model } = require('mongoose');

const PublicacionesSchema = Schema(
	{
		fechaPublicacion: {
			type: Date,
			default: Date.now(),
		},
		idCreador: {
			type: Schema.Types.ObjectID,
			ref: 'Usuario',
		},
		numeroMeGustas: {
			type: Number,
			require: true,
		},
		numeroComentarios: {
			type: Number,
			require: true,
		},
		descripcion: {
			type: String,
			require: true,
		},
		contenido: {
			type: String,
			require: true,
		},
		tags: [String],
	},
	{
		toJSON: {
			virtual: true,
		},
		toObject: {
			virtual: true,
		},
		collection: 'publicaciones',
	}
);

PublicacionesSchema.virtual('Usuario', {
	ref: 'Usuario',
	localField: 'idCreador',
	foreignField: '_id',
	justOne: true,
});

PublicacionesSchema.method('toJSON', function () {
	const { __v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});

module.exports = model('Publicacion', PublicacionesSchema);
