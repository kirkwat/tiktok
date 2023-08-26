import {
  getDocs,
  collection,
  query,
  getDoc,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { FIREBASE_DB } from "../../firebaseConfig";
import { Post } from "../../types";

/**
 * Returns all the posts in the database.
 *
 * @returns {Promise<[<Post>]>} post list if successful.
 */

export const getFeed = (): Promise<Post[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const q = query(collection(FIREBASE_DB, "post"));
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
      doc(FIREBASE_DB, "post", postId, "likes", uid)
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
  currentLikeState: boolean
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
