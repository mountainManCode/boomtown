import * as firebase from 'firebase';
import 'firebase/auth';

// Initialize Firebase
const config = {
    apiKey: 'AIzaSyBGChQYckyz46Ih-8nTpaMiP9qDyDDfxWw',
    authDomain: 'boomtown-mmc9.firebaseapp.com',
    databaseURL: 'https://boomtown-mmc9.firebaseio.com',
    projectId: 'boomtown-mmc9',
    storageBucket: 'boomtown-mmc9.appspot.com',
    messagingSenderId: '350770359974',
};

const firebaseApp = firebase.initializeApp(config);
const firebaseAuth = firebaseApp.auth();

export { firebaseApp, firebaseAuth };
