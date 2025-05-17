import { SERVER_API_KEYS, } from "@/shared/service/api"
import { postService } from "@/shared/service/post.service"
import { PostType } from "@/shared/types"
import { useQuery, UseQueryResult } from "@tanstack/react-query"


export const useGetPostByIdQuery = (): UseQueryResult<Array<PostType>, Error> => {
  return useQuery({
    queryKey: [SERVER_API_KEYS.POSTS],
    queryFn: async () => postService.getPostsByUserId(),
    retry: false
  })
}
