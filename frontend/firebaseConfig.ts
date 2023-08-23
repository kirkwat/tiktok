import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCE4Dn4dGOhwcpYyVsUUTAtMEOCNfJlJKo",
  authDomain: "ate-out-of-10.firebaseapp.com",
  databaseURL: "https://ate-out-of-10-default-rtdb.firebaseio.com",
  projectId: "ate-out-of-10",
  storageBucket: "ate-out-of-10.appspot.com",
  messagingSenderId: "899851871046",
  appId: "1:899851871046:web:b894ea5825f06bb588fb47",
  measurementId: "G-844MXPVSG4",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
