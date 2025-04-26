import { mainAxios } from "./mainAxios";
import { IHttpClient, IHttpConfig, IResponse } from "./types";

export class HttpService {
  constructor(
    private readonly fetchingService: IHttpClient = mainAxios,
  ) { }

  private async checkResponseStatus<T>(result: IResponse<T>,): Promise<void> {
    if (result.status >= 400 && result.status < 600) {
      const errorData = {
        response: {
          status: result.status,
          data: result.data,
        },
      }

      throw new Error(JSON.stringify(errorData,),)
    }
  }

  public async get<T>(url: string, config?: IHttpConfig,): Promise<T> {
    return this.fetchingService
      .get<IResponse<T>>(url, {
        ...config,
        headers: {
          ...config?.headers,
        },
      },)
      .then((result,) => {
        this.checkResponseStatus(result,)
        return result.data
      },)
  }

  public async post<T, TD extends object | undefined = undefined>(url: string, data?: TD, config?: IHttpConfig,): Promise<T> {
    return this.fetchingService
      .post<IResponse<T>, TD | undefined>(url, data, {
        ...config,
        headers: {
          ...config?.headers,
        },
      },)
      .then((result,) => {
        this.checkResponseStatus(result,)
        return result.data
      },)
  }

  public async put<T, TD>(url: string, data: TD, config?: IHttpConfig,): Promise<T> {
    return this.fetchingService
      .put<IResponse<T>, TD>(url, data, {
        ...config,
        headers: {
          ...config?.headers,
        },
      },)
      .then((result,) => {
        this.checkResponseStatus(result,)
        return result.data
      },)
  }

  public async patch<T, TD>(url: string, data: TD, config?: IHttpConfig,): Promise<T> {
    return this.fetchingService
      .patch<IResponse<T>, TD>(url, data, {
        ...config,
        headers: {
          ...config?.headers,
        },
      },)
      .then((result,) => {
        this.checkResponseStatus(result,)
        return result.data
      },)
  }

  public async delete<T>(url: string, config?: IHttpConfig,): Promise<T> {
    return this.fetchingService
      .delete<IResponse<T>>(url, {
        ...config,
        headers: {
          ...config?.headers,
        },
      },)
      .then((result,) => {
        this.checkResponseStatus(result,)
        return result.data
      },)
  }
}
