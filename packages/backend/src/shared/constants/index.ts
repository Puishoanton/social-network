export const prismaUserOmit = {
  updatedAt: true,
  createdAt: true,
  password: true,
};

export const prismaPostInclude = {
  user: {
    select: {
      id: true,
      name: true,
      picture: true,
    },
  },
  likes: true,
};
export const prismaPostOmit = {
  updatedAt: true,
  userId: true,
};
