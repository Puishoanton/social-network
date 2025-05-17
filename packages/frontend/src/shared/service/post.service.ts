import { MessegeReturnType, PostType } from "../types";
import { SERVER_API_KEYS } from "./api";
import { HttpService } from "./http.service";

class PostService {
  constructor(
    private readonly httpService: HttpService
  ) { }

  public async getPosts(): Promise<Array<PostType>> {
    const url = new URL(`${SERVER_API_KEYS.POSTS}`,)

    return await this.httpService.get<Array<PostType>>(url.toString(),)
  }
  public async getPostById(id: string): Promise<PostType> {
    const url = new URL(`${SERVER_API_KEYS.POSTS}/${id}`,)

    return await this.httpService.get<PostType>(url.toString(),)
  }
  public async getPostsByUserId(): Promise<Array<PostType>> {
    const url = new URL(`${SERVER_API_KEYS.MY_POSTS}`,)

    return await this.httpService.get<Array<PostType>>(url.toString(),)
  }
  
  public async likePostsById(id: string): Promise<MessegeReturnType> {
    const url = new URL(`${SERVER_API_KEYS.LIKE_POST}/${id}`,)

    return await this.httpService.post<MessegeReturnType>(url.toString(),)
  }
  
  public async createPost(content: FormData): Promise<MessegeReturnType> {
    const url = new URL(`${SERVER_API_KEYS.CREATE_POST}`,)

    return this.httpService.post(url.toString(), content)
  }
}

export const postService = new PostService(new HttpService)
