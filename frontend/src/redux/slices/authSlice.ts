import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { getPostsByUser } from "./postSlice";
import { User } from "../../../types";

export const userAuthStateListener = createAsyncThunk(
  "auth/userAuthStateListener",
  async (_, { dispatch }) => {
    FIREBASE_AUTH.onAuthStateChanged((user) => {
      if (user) {
        dispatch(getCurrentUserData());
        dispatch(getPostsByUser(user.uid));
      } else {
        dispatch(setUserState({ currentUser: null, loaded: true }));
      }
    });
  },
);

export const getCurrentUserData = createAsyncThunk(
  "auth/getCurrentUserData",
  async (_, { dispatch }) => {
    if (FIREBASE_AUTH.currentUser) {
      const unsub = onSnapshot(
        doc(FIREBASE_DB, "user", FIREBASE_AUTH.currentUser.uid),
        (res) => {
          if (res.exists()) {
            dispatch(setUserState({ currentUser: res.data(), loaded: true }));
          }
        },
      );
    } else {
      console.log("No user is signed in.");
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (payload: { email: string; password: string }) => {
    const { email, password } = payload;
    await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
  },
);

export const register = createAsyncThunk(
  "auth/register",
  async (payload: { email: string; password: string }) => {
    const { email, password } = payload;
    await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
  },
);

interface AuthState {
  currentUser: User | null;
  loaded: boolean;
}

const initialState: AuthState = {
  currentUser: null,
  loaded: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
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
