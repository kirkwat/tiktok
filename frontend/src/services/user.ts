import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebaseConfig";
import { updateProfile } from "firebase/auth";
import {
  getFirestore,
  doc,
  updateDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { saveMediaToStorage } from "./utils";
import { SearchUser } from "../../types";

export const saveUserProfileImage = (image: string) =>
  new Promise<void>(async (resolve, reject) => {
    try {
      if (FIREBASE_AUTH.currentUser) {
        const downloadURL = await saveMediaToStorage(
          image,
          `profileImage/${FIREBASE_AUTH.currentUser.uid}`
        );

        const db = getFirestore();
        const userDoc = doc(db, "user", FIREBASE_AUTH.currentUser.uid);

        await updateDoc(userDoc, {
          photoURL: downloadURL,
        });

        // Also update the user profile in Firebase Auth if needed
        await updateProfile(FIREBASE_AUTH.currentUser, {
          photoURL: downloadURL,
        });

        resolve();
      }
    } catch (error) {
      console.error("Failed to save user profile image: ", error);
      reject(error);
    }
  });

export const saveUserField = (field: string, value: string) =>
  new Promise<void>(async (resolve, reject) => {
    try {
      if (FIREBASE_AUTH.currentUser) {
        const userDoc = doc(FIREBASE_DB, "user", FIREBASE_AUTH.currentUser.uid);

        let obj: { [key: string]: string } = {};
        obj[field] = value;

        await updateDoc(userDoc, obj);
        resolve();
      }
    } catch (error) {
      console.error("Failed to save user field: ", error);
      reject(error);
    }
  });

export const queryUsersByEmail = (email: string): Promise<SearchUser[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      if (email === "") {
        resolve([]);
        return;
      }

      const q = query(
        collection(FIREBASE_DB, "user"),
        where("email", ">=", email),
        where("email", "<=", email + "\uf8ff")
      );

      const querySnapshot = await getDocs(q);
      const users = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data } as SearchUser;
      });

      resolve(users);
    } catch (error) {
      console.error("Failed to query users: ", error);
      reject(error);
    }
  });
};
