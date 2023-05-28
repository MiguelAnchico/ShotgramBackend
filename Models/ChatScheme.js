const { Schema, model } = require('mongoose');

const ChatSchema = Schema(
	{
		participantes: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Usuario',
			},
		],
	},
	{
		toJSON: {
			virtual: true,
		},
		toObject: {
			virtual: true,
		},
		collection: 'chats',
	}
);

ChatSchema.method('toJSON', function () {
	const { __v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});

module.exports = model('Chat', ChatSchema);
