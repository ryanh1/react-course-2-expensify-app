import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyC-sPO2TfwJ349F8pnRdmHmCHEqo1FxcIY",
  authDomain: "expensify-41ead.firebaseapp.com",
  databaseURL: "https://expensify-41ead.firebaseio.com",
  projectId: "expensify-41ead",
  storageBucket: "expensify-41ead.appspot.com",
  messagingSenderId: "971042594178"
};
firebase.initializeApp(config);

const database = firebase.database();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };
