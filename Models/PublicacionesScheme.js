const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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
		tipo: { type: String, require: true },
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

PublicacionesSchema.method('toJSON', function () {
	const { __v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});

PublicacionesSchema.plugin(mongoosePaginate);

module.exports = model('Publicacion', PublicacionesSchema);
