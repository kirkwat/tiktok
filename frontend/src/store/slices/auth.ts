// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
// } from "firebase/auth";
// import { auth } from "../../../firebaseConfig";

// const auth2 = auth;

// export const login = (email: string, password: string) => () =>
//   new Promise<void>((resolve, reject) => {
//     createUserWithEmailAndPassword(auth2, email, password)
//       .then((userCredential) => {
//         const user = userCredential.user;
//         resolve();
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         reject();
//       });
//   });

// export const register = (email: string, password: string) => () =>
//   new Promise<void>((resolve, reject) => {
//     signInWithEmailAndPassword(auth2, email, password)
//       .then((userCredential) => {
//         const user = userCredential.user;
//         resolve();
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.log(errorCode, errorMessage);
//         reject(error);
//       });
//   });
