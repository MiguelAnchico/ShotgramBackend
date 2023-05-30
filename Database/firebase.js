const { initializeApp } = require('firebase/app');

const firebaseConfig = {
	apiKey: 'AIzaSyCVzIsKzqs0DxTsiZXAIy6GFpbyPIY7VJ0',
	authDomain: 'shotgramdbfiles.firebaseapp.com',
	projectId: 'shotgramdbfiles',
	storageBucket: 'shotgramdbfiles.appspot.com',
	messagingSenderId: '1040104134308',
	appId: '1:1040104134308:web:4e38c127d995b337db3831',
};

// Initialize Firebase

const firebaseDB = initializeApp(firebaseConfig);

module.exports = {
	firebaseDB,
};
