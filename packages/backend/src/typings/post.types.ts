type UserPostType = {
  id: string;
  name: string;
  picture: string;
};
export type PostReturnType = {
  content: string;
  likes: number;
  user: UserPostType;
};

export type MessegeResponseType = {
  message: string;
};
