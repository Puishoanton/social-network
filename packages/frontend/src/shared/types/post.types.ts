type UserPostType = {
  id: string;
  name: string;
  picture: string;
};

export type PostType = {
  id: string
  content: string;
  likes: number;
  user: UserPostType;
};
export type MessegeReturnType = {
  messege: string
}
