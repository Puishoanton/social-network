import { UserType } from "../types";
import { SERVER_API_KEYS } from "./api";
import { HttpService } from "./http.service";



class UserService {
  constructor(
    private readonly httpService: HttpService
  ) { }

  public async getUser(): Promise<UserType> {
    const url = new URL(`${SERVER_API_KEYS.USER}`,)

    return await this.httpService.get<UserType>(url.toString(),)
  }
}

export const productService = new UserService(new HttpService)
