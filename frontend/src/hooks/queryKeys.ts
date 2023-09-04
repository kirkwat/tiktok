export const keys = {
  user: (user: string | null) => ["user", user],
  userFollowing: (userId: string, otherUserId: string) => [
    "following",
    userId + otherUserId,
  ],
};
