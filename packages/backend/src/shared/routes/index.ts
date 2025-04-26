const CRUD_KEYS = {
	CREATE: 'create',
	GET_ALL: '',
	GET_ME: 'me',
	ID: ':id',
}

export const AUTH_ROUTE_KEYS = {
	MAIN: 'auth',
	GOOGLE: 'google',
	GOOGLE_REDIRECT: 'google/redirect',
	REGISTER: 'registration',
	ACTIVATE: 'activate/:token',
	LOG_OUT: 'logout',
}

export const USER_ROUTE_KEYS = {
	MAIN: 'user',
	...CRUD_KEYS,
}

export const ROLE_ROUTE_KEYS = {
	MAIN: 'role',
	...CRUD_KEYS,
}
