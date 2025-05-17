export const SERVER_URL = `http://localhost:5000/api`

export const SERVER_API_KEYS = {
  USER: `${SERVER_URL}/user`,

  POSTS: `${SERVER_URL}/post`,
  CREATE_POST: `${SERVER_URL}/post/create`,
  MY_POSTS: `${SERVER_URL}/post/my-posts`,
  LIKE_POST: `${SERVER_URL}/post/like-post`,

  LOGIN: `${SERVER_URL}/auth/login`,
  LOGOUT: `${SERVER_URL}/auth/logout`,
  REGISTER: `${SERVER_URL}/auth/register`,
  REFRESH: `${SERVER_URL}/auth/refresh`
}
