const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema(
	{
		nombre: {
			type: String,
			require: true,
		},
		password: {
			type: String,
			require: true,
		},
		correo: {
			type: String,
			require: true,
		},
		usuario: {
			type: String,
			require: true,
		},
		descripcion: {
			type: String,
			require: false,
		},
		seguidores: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Usuario',
			},
		],
		seguidos: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Usuario',
			},
		],
		publicaciones: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Publicacion',
			},
		],
		publicacionesGustados: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Publicacion',
			},
		],
		imagen: {
			type: String,
			require: true,
		},
		configuraciones: [
			{
				privado: {
					type: Boolean,
					default: false,
				},
				nsfw: {
					type: Boolean,
					default: false,
				},
			},
		],
		bloqueados: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Usuario',
			},
		],
		tipo: {
			type: String,
			require: true,
		},
	},
	{
		toJson: {
			virtual: true,
		},
		toObject: {
			virtual: true,
		},
		collection: 'usuarios',
	}
);

UsuarioSchema.virtual('Usuario', {
	ref: 'Usuario',
	localField: '_id',
	foreignField: '_id',
	justOne: false,
});

UsuarioSchema.virtual('publicacion', {
	ref: 'Publicacion',
	localField: '_id',
	foreignField: 'idCreador',
	justOne: false,
});

UsuarioSchema.method('toJSON', function () {
	const { __v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});

module.exports = model('Usuario', UsuarioSchema);
