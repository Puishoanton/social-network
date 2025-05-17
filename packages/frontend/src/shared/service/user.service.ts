import { UserReturnType } from "../types";
import { SERVER_API_KEYS } from "./api";
import { HttpService } from "./http.service";

class UserService {
  constructor(
    private readonly httpService: HttpService
  ) { }

  public async getUser(): Promise<UserReturnType> {
    const url = new URL(`${SERVER_API_KEYS.USER}`,)

    return await this.httpService.get<UserReturnType>(url.toString(),)
  }
}

export const productService = new UserService(new HttpService)
