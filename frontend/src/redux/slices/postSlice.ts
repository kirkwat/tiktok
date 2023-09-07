import { FIREBASE_AUTH, FIREBASE_DB } from "../../../firebaseConfig";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { saveMediaToStorage } from "../../services/utils";
import uuid from "uuid-random";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post } from "../../../types";

interface PostState {
  loading: boolean;
  error: string | null;
  currentUserPosts: Post[] | null;
}

const initialState: PostState = {
  loading: false,
  error: null,
  currentUserPosts: null,
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
    { rejectWithValue },
  ) => {
    if (FIREBASE_AUTH.currentUser) {
      try {
        const storagePostId = uuid();
        const [videoDownloadUrl, thumbnailDownloadUrl] = await Promise.all([
          saveMediaToStorage(
            video,
            `post/${FIREBASE_AUTH.currentUser.uid}/${storagePostId}/video`,
          ),
          saveMediaToStorage(
            thumbnail,
            `post/${FIREBASE_AUTH.currentUser.uid}/${storagePostId}/thumbnail`,
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
  },
);

export const getPostsByUser = createAsyncThunk(
  "post/getPostsByUser",
  async (uid: string, { dispatch, rejectWithValue }) => {
    try {
      // Create a query against the collection.
      const q = query(
        collection(FIREBASE_DB, "post"),
        where("creator", "==", uid),
        orderBy("creation", "desc"),
      );

      const querySnapshot = await getDocs(q);

      // Map over the snapshot to get the array of posts
      const posts = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data } as Post;
      });
      // Dispatch action to update the state. Replace `CURRENT_USER_POSTS_UPDATE` with the actual action creator
      dispatch({ type: "CURRENT_USER_POSTS_UPDATE", payload: posts });

      return posts; // Return posts as fulfilled payload
    } catch (error) {
      console.error("Failed to get posts: ", error);
      return rejectWithValue(error);
    }
  },
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
      })
      .addCase(getPostsByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getPostsByUser.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.loading = false;
          state.currentUserPosts = action.payload;
        },
      )
      .addCase(getPostsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export default postSlice.reducer;
