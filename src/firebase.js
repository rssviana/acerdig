import firebase from 'firebase/app'

var config = {
    apiKey: "AIzaSyARHS4KRRrDpjhdWA0xLAEE2SJIvGG4Suk",
    authDomain: "acerdig-4edc5.firebaseapp.com",
    databaseURL: "https://acerdig-4edc5.firebaseio.com",
    projectId: "acerdig-4edc5",
    storageBucket: "acerdig-4edc5.appspot.com",
    messagingSenderId: "384597105002"
  };

const fire = firebase.initializeApp(config)

export default fire