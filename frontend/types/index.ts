export interface Post {
  id: string;
  creator: string;
  media: string[];
  description: string;
  likesCount: number;
  commentsCount: number;
  creation: any;
}

export interface User {
  email: string;
  displayName: string;
  photoURL: string;
  id?: string;
}

export interface SearchUser extends User {
  id: string;
}
