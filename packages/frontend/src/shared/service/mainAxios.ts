import axios, { AxiosError, AxiosResponse } from "axios";

type ApiResponseType<T = unknown> = {
  data: T;
  status: number;
  message?: string;
  error?: string;
}
type ApiErrorType = {
  message: string;
  statusCode: number;
  path?: string;
}

export const mainAxios = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

const logError = (error: AxiosError<ApiErrorType>) => {
  console.log('API Error:', {
    url: error.config?.url,
    method: error.config?.method,
    status: error.response?.status,
    message: error.response?.data?.message || error.message,
  });
};
const handleSuccess = <T>(response: AxiosResponse<ApiResponseType<T>>): AxiosResponse<ApiResponseType<T>> => {
  return response;
};
const handleError = async (error: AxiosError<ApiErrorType>): Promise<never> => {
  logError(error);

  const apiError: ApiErrorType = {
    message: error.response?.data?.message || error.message,
    statusCode: error.response?.status || 500,
    path: error.config?.url
  };

  return Promise.reject(apiError);
};

mainAxios.interceptors.response.use(
  handleSuccess,
  handleError
);
