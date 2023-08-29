export const keys = {
  user: (user: string | undefined) => ["user", user],
  userFollowing: (userId: string, otherUserId: string) => [
    "following",
    userId + otherUserId,
  ],
};
