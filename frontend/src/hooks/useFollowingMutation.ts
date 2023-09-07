import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeFollowState } from "../services/user";
import { keys } from "./queryKeys";
import { FIREBASE_AUTH } from "../../firebaseConfig";

/**
 * Mutate the state of the follow cache system
 * over a pair of users.
 * In order to do this action optimistically we mutate
 * the data as soon as the request is made, not waiting for the
 * firestore response.
 *
 * @param {Object} options to be passed along to useQuery
 * @returns
 */
export const useFollowingMutation = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation(changeFollowState, {
    ...options,
    onMutate: (variables) => {
      if (!FIREBASE_AUTH.currentUser?.uid) {
        console.error("No current user");
        return;
      }

      queryClient.setQueryData(
        keys.userFollowing(
          FIREBASE_AUTH.currentUser?.uid,
          variables.otherUserId,
        ),
        !variables.isFollowing,
      );
    },
  });
};
