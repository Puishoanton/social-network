const CRUD_KEYS = {
  CREATE: 'create',
  GET_ALL: '',
  GET_ME: 'me',
  ID: ':id',
};

export const AUTH_ROUTE_KEYS = {
  MAIN: 'auth',
  REGISTER: 'register',
  LOGIN: 'login',
  LOGOUT: 'logout',
  REFRESH: 'refresh',
};

export const USER_ROUTE_KEYS = {
  MAIN: 'user',
  ...CRUD_KEYS,
};
export const POST_ROUTE_KEYS = {
  MAIN: 'post',
  LIKE_POST: 'like-post/:postId',
  GET_ALL_BY_USER_ID: 'my-posts',
  ...CRUD_KEYS,
};
