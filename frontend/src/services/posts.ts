import {
  getDocs,
  collection,
  query,
  getDoc,
  doc,
  deleteDoc,
  setDoc,
  addDoc,
  serverTimestamp,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebaseConfig";
import { Post, Comment } from "../../types";
import { Dispatch, SetStateAction } from "react";

let commentListenerInstance: (() => void) | null = null;

/**
 * Returns all the posts in the database.
 *
 * @returns {Promise<[<Post>]>} post list if successful.
 */

export const getFeed = (): Promise<Post[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const q = query(
        collection(FIREBASE_DB, "post"),
        orderBy("creation", "desc"),
      );
      const querySnapshot = await getDocs(q);
      const posts = querySnapshot.docs.map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data } as Post;
      });
      resolve(posts);
    } catch (error) {
      console.error("Failed to get feed: ", error);
      reject(error);
    }
  });
};

/**
 * Gets the like state of a user in a specific post
 * @param {String} postId - id of the post
 * @param {String} uid - id of the user to get the like state of.
 *
 * @returns {Promise<Boolean>} true if user likes it and vice versa.
 */
export const getLikeById = async (postId: string, uid: string) => {
  try {
    const likeDoc = await getDoc(
      doc(FIREBASE_DB, "post", postId, "likes", uid),
    );
    return likeDoc.exists();
  } catch (error) {
    throw new Error("Could not get like");
  }
};

/**
 * Updates the like of a post according to the current user's id
 * @param {String} postId - id of the post
 * @param {String} uid - id of the user to get the like state of.
 * @param {Boolean} currentLikeState - true if the user likes the post and vice versa.
 */
export const updateLike = async (
  postId: string,
  uid: string,
  currentLikeState: boolean,
) => {
  const likeDocRef = doc(FIREBASE_DB, "post", postId, "likes", uid);

  try {
    if (currentLikeState) {
      await deleteDoc(likeDocRef);
    } else {
      await setDoc(likeDocRef, {});
    }
  } catch (error) {
    throw new Error("Could not update like");
  }
};

export const addComment = async (
  postId: string,
  creator: string,
  comment: string,
) => {
  try {
    await addDoc(collection(FIREBASE_DB, "post", postId, "comments"), {
      creator,
      comment,
      creation: serverTimestamp(),
    });
  } catch (e) {
    console.error("Error adding comment: ", e);
  }
};

export const commentListener = (
  postId: string,
  setCommentList: Dispatch<SetStateAction<Comment[]>>,
) => {
  const commentsQuery = query(
    collection(FIREBASE_DB, "post", postId, "comments"),
    orderBy("creation", "desc"),
  );

  const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
    if (snapshot.docChanges().length === 0) {
      return;
    }
    const comments = snapshot.docs.map((docSnapshot) => {
      const id = docSnapshot.id;
      const data = docSnapshot.data();
      return { id, ...data } as Comment;
    });
    setCommentList(comments);
  });

  return unsubscribe;
};

export const clearCommentListener = () => {
  if (commentListenerInstance != null) {
    commentListenerInstance();
    commentListenerInstance = null;
  }
};

export const getPostsByUserId = (
  uid = FIREBASE_AUTH.currentUser?.uid,
): Promise<Post[]> => {
  return new Promise((resolve, reject) => {
    if (!uid) {
      reject(new Error("User ID is not set"));
      return;
    }

    const q = query(
      collection(FIREBASE_DB, "post"),
      where("creator", "==", uid),
      orderBy("creation", "desc"),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let posts = snapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data } as Post;
      });
      resolve(posts);
    });

    return () => unsubscribe();
  });
};
