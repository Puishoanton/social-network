import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { SERVER_API_KEYS, } from "@/shared/service/api"
import { postService } from "@/shared/service/post.service"
import { PostType } from "@/shared/types"


export const useGetPostByIdQuery = (id: string): UseQueryResult<PostType, Error> => {
  return useQuery({
    queryKey: [SERVER_API_KEYS.POSTS, id],
    queryFn: async () => postService.getPostById(id),
    retry: false
  })
}
