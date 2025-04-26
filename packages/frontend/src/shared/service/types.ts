export interface IHttpConfig {
	url?: string;
	headers?: Record<string, string>;
	params?: unknown;
  data?: unknown;
  signal?: AbortSignal
}

export interface IHttpClient {
  get: <T>(url: string, config?: IHttpConfig) => Promise<T>;
  post: <T, TD>(url: string, data: TD, config?: IHttpConfig) => Promise<T>;
  put: <T, TD>(url: string, data: TD, config?: IHttpConfig) => Promise<T>;
  delete: <T>(url: string, config?: IHttpConfig) => Promise<T>;
  patch: <T, TD>(url: string, data: TD, config?: IHttpConfig) => Promise<T>;
}

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,

  MOVED_PERMANENTLY = 301,
  FOUND = 302,

  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  CONFLICT = 409,

  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504
}

export interface IResponse<T = object | Array<object>> {
  status: HttpStatusCode;
  data: T;
}
