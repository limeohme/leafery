
type userData = {
    username: string;
    email: string;
    avatart: string;
    likes: number;
    dislikes: number;
    likedLeaves: number;
    dislikedLeaves: number;
    leaves: number;
    publicLeaves: number;
}

export const defaultUserData: userData = {
  username: '',
  email: '',
  avatart: '',
  likes: 0,
  dislikes: 0,
  likedLeaves: 0,
  dislikedLeaves: 0,
  leaves: 0,
  publicLeaves: 0
};