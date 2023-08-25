import { FIREBASE_AUTH, FIREBASE_DB } from "../../../firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { saveMediaToStorage } from "./utils";
import uuid from "uuid-random";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface PostState {
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  loading: false,
  error: null,
};

export const createPost = createAsyncThunk(
  "post/create",
  async (
    {
      description,
      video,
      thumbnail,
    }: {
      description: string;
      video: string;
      thumbnail: string;
    },
    { rejectWithValue }
  ) => {
    if (FIREBASE_AUTH.currentUser) {
      try {
        const storagePostId = uuid();
        const [videoDownloadUrl, thumbnailDownloadUrl] = await Promise.all([
          saveMediaToStorage(
            video,
            `post/${FIREBASE_AUTH.currentUser.uid}/${storagePostId}/video`
          ),
          saveMediaToStorage(
            thumbnail,
            `post/${FIREBASE_AUTH.currentUser.uid}/${storagePostId}/thumbnail`
          ),
        ]);

        await addDoc(collection(FIREBASE_DB, "post"), {
          creator: FIREBASE_AUTH.currentUser.uid,
          media: [videoDownloadUrl, thumbnailDownloadUrl],
          description,
          likesCount: 0,
          commentsCount: 0,
          creation: serverTimestamp(),
        });
      } catch (error) {
        console.error("Error creating post: ", error);
        return rejectWithValue(error);
      }
    } else {
      return rejectWithValue(new Error("User not authenticated"));
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    // Add synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

// Export your action creators and reducers
export default postSlice.reducer;
