import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../firebaseConfig";
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";

export const userAuthStateListener = createAsyncThunk(
  "auth/userAuthStateListener",
  async (_, { dispatch }) => {
    FIREBASE_AUTH.onAuthStateChanged((user) => {
      if (user) {
        dispatch(getCurrentUserData());
      } else {
        dispatch(setUserState({ currentUser: null, loaded: true }));
      }
    });
  }
);

export const getCurrentUserData = createAsyncThunk(
  "auth/getCurrentUserData",
  async (_, { dispatch }) => {
    if (FIREBASE_AUTH.currentUser) {
      try {
        await addDoc(collection(FIREBASE_DB, "user"), {
          uid: FIREBASE_AUTH.currentUser.uid,
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }

      const unsub = onSnapshot(
        doc(FIREBASE_DB, "user", FIREBASE_AUTH.currentUser.uid),
        (res) => {
          if (res.exists()) {
            dispatch(setUserState({ currentUser: res.data(), loaded: true }));
          }
        }
      );
    } else {
      console.log("No user is signed in.");
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (payload: { email: string; password: string }) => {
    const { email, password } = payload;
    await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (payload: { email: string; password: string }) => {
    const { email, password } = payload;
    await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    loaded: false,
  },
  reducers: {
    setUserState: (state, action) => {
      state.currentUser = action.payload.currentUser;
      state.loaded = action.payload.loaded;
    },
  },
  extraReducers: (builder) => {
    // Handle additional cases for async actions if needed
  },
});

export const { setUserState } = authSlice.actions;
export default authSlice.reducer;
