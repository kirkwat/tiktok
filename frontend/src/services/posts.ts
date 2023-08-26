import { getDocs, collection, query } from "firebase/firestore";
import { FIREBASE_DB } from "../../firebaseConfig"; // Make sure to import your initialized Firestore instance
import { Post } from "../../types";

/**
 * Returns all the posts in the database.
 *
 * @returns {Promise<[<Object>]>} post list if successful.
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
