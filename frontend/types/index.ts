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
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
}

export interface SearchUser extends User {
  id: string;
}
