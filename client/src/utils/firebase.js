// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "auth-i-13.firebaseapp.com",
  projectId: "auth-i-13",
  storageBucket: "auth-i-13.firebasestorage.app",
  messagingSenderId: "325835857487",
  appId: "1:325835857487:web:e0c72ed67ea058bb39943a",
};

//Initialize Firebase
//ye app pe authentication enable hai for pop up
const app = initializeApp(firebaseConfig);
//now inside this app we have to enable authentication and export it so that we can use it in other files
const auth = getAuth(app);
// get the auth instance
const provider = new GoogleAuthProvider();
// get the provider instance for google authentication

export { auth, provider };
