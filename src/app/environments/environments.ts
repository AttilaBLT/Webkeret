import { initializeApp } from "firebase/app";

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAG1C0wbOZNXV05CohjHlbeKg_xfH_HZIU",
    authDomain: "webkeret-idopontfoglalas.firebaseapp.com",
    projectId: "webkeret-idopontfoglalas",
    storageBucket: "webkeret-idopontfoglalas.appspot.com",
    messagingSenderId: "768779161125",
    appId: "1:768779161125:web:c2929141138e9dc07ff9cc"
  }
};

const app = initializeApp(environment.firebase);