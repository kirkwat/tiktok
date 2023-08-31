import { useQuery } from "@tanstack/react-query";

import { keys } from "./queryKeys";
import { getIsFollowing } from "../services/user";

/**
 * hook meant to fetch a user using react-query in order
 * to cache data and avoid unnecessary queries to be made
 * to firestore for the follow state of the user over another
 *
 * @param {String} userId of the user we want to see if it's following another
 * @param {String} otherUserId the id of the user that we want to check if it's being followed by another.
 * @param {Object} options to be passed along to useQuery
 * @returns
 */
export const useFollowing = (
  userId: string,
  otherUserId: string,
  options = {},
) => {
  return useQuery(
    keys.userFollowing(userId, otherUserId),
    () => getIsFollowing(userId, otherUserId),
    options,
  );
};
