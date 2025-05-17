import { MessegeReturnType, UserReturnType } from "../types";
import { SERVER_API_KEYS } from "./api";
import { HttpService } from "./http.service";

class AuthService {
  constructor(
    private readonly httpService: HttpService
  ) { }
  public async login(credentials: FormData): Promise<MessegeReturnType> {
    const url = new URL(`${SERVER_API_KEYS.LOGIN}`,)

    return this.httpService.post(url.toString(), credentials)
  }
  public async logout(): Promise<MessegeReturnType> {
    const url = new URL(`${SERVER_API_KEYS.LOGOUT}`,)

    return this.httpService.get(url.toString())
  }

  public async register(credentials: FormData): Promise<MessegeReturnType> {
    const url = new URL(`${SERVER_API_KEYS.REGISTER}`,)

    return this.httpService.post(url.toString(), credentials)
  }

  public async refresh(): Promise<UserReturnType> {
    const url = new URL(`${SERVER_API_KEYS.REFRESH}`,)

    return this.httpService.get(url.toString(),)
  }
}

export const authService = new AuthService(new HttpService)
