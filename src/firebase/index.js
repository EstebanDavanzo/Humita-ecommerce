import * as firebase from 'firebase/app';
import 'firebase/firestore';

const app = firebase.initializeApp ({
    apiKey: "AIzaSyAwclO_O06pXvlHWU8KBLmkN8VPE2crNJk",
    authDomain: "humita-ecommerce.firebaseapp.com",
    databaseURL: "https://humita-ecommerce.firebaseio.com",
    projectId: "humita-ecommerce",
    storageBucket: "humita-ecommerce.appspot.com",
    messagingSenderId: "569991960673",
    appId: "1:569991960673:web:45d85cb3fa598792f23220",
    measurementId: "G-0FTVGY4V6C"
  });

  export function getFirebase(){
      return app;
  }

  export function getFirestore(){
      return firebase.firestore(app);
  }

