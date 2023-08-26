export interface Post {
  id: string;
  creator: string;
  media: string[];
  description: string;
  likesCount: number;
  commentsCount: number;
  creation: string;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL: string;
}
