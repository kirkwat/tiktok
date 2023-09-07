/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

export const likeCreate = functions.firestore
  .document("post/{id}/{type}/{uid}")
  .onCreate(async (_, context) => {
    const { type, id } = context.params;

    return db.runTransaction(async (transaction) => {
      const postRef = db.collection("post").doc(id);
      const postSnapshot = await transaction.get(postRef);

      if (!postSnapshot.exists) {
        throw new Error(`Post with ID ${id} not found`);
      }

      let updateObj = {};

      if (type === "comments") {
        updateObj = { commentsCount: admin.firestore.FieldValue.increment(1) };
      } else if (type === "likes") {
        updateObj = { likesCount: admin.firestore.FieldValue.increment(1) };

        const creator = postSnapshot.data()?.creator;

        if (creator) {
          const userRef = db.collection("user").doc(creator);
          transaction.update(userRef, {
            likesCount: admin.firestore.FieldValue.increment(1),
          });
        }
      }

      transaction.update(postRef, updateObj);
    });
  });

export const likeDelete = functions.firestore
  .document("post/{id}/{type}/{uid}")
  .onDelete(async (_, context) => {
    const { type, id } = context.params;

    return db.runTransaction(async (transaction) => {
      const postRef = db.collection("post").doc(id);
      const postSnapshot = await transaction.get(postRef);

      if (!postSnapshot.exists) {
        throw new Error(`Post with ID ${id} not found`);
      }

      let updateObj = {};

      if (type === "comments") {
        updateObj = { commentsCount: admin.firestore.FieldValue.increment(-1) };
      } else if (type === "likes") {
        updateObj = { likesCount: admin.firestore.FieldValue.increment(-1) };

        const creator = postSnapshot.data()?.creator;

        if (creator) {
          const userRef = db.collection("user").doc(creator);
          transaction.update(userRef, {
            likesCount: admin.firestore.FieldValue.increment(-1),
          });
        }
      }

      transaction.update(postRef, updateObj);
    });
  });

export const followCreate = functions.firestore
  .document("user/{followerId}/following/{userId}")
  .onCreate(async (_, context) => {
    const { followerId, userId } = context.params;

    return db.runTransaction(async (transaction) => {
      const user = db.collection("user").doc(userId);
      const follower = db.collection("user").doc(followerId);

      const userSnapshot = await transaction.get(user);
      const followerSnapshot = await transaction.get(follower);

      if (!userSnapshot.exists || !followerSnapshot.exists) {
        throw new Error("User not found");
      }

      transaction.update(user, {
        followersCount: admin.firestore.FieldValue.increment(1),
      });

      transaction.update(follower, {
        followingCount: admin.firestore.FieldValue.increment(1),
      });
    });
  });

export const followDelete = functions.firestore
  .document("user/{followerId}/following/{userId}")
  .onDelete(async (_, context) => {
    const { followerId, userId } = context.params;

    return db.runTransaction(async (transaction) => {
      const user = db.collection("user").doc(userId);
      const follower = db.collection("user").doc(followerId);

      const userSnapshot = await transaction.get(user);
      const followerSnapshot = await transaction.get(follower);

      if (!userSnapshot.exists || !followerSnapshot.exists) {
        throw new Error("User not found");
      }

      transaction.update(user, {
        followersCount: admin.firestore.FieldValue.increment(-1),
      });

      transaction.update(follower, {
        followingCount: admin.firestore.FieldValue.increment(-1),
      });
    });
  });

export const newUser = functions.auth.user().onCreate((user) => {
  const userData = {
    ...JSON.parse(JSON.stringify(user)),
    followingCount: 0,
    followersCount: 0,
    likesCount: 0,
  };

  return db.collection("user").doc(user.uid).set(userData);
});
