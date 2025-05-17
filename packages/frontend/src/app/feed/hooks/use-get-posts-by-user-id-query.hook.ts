import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { SERVER_API_KEYS, } from "@/shared/service/api"
import { postService } from "@/shared/service/post.service"
import { PostType } from "@/shared/types"


export const useGetPostsByUserIdQuery = (): UseQueryResult<Array<PostType>, Error> => {
  return useQuery({
    queryKey: [SERVER_API_KEYS.MY_POSTS],
    queryFn: async () => postService.getPostsByUserId(),
    retry: false
  })
}
