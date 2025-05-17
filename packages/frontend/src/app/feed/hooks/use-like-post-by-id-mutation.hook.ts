import { SERVER_API_KEYS } from "@/shared/service/api"
import { postService } from "@/shared/service/post.service"
import { MessegeReturnType } from "@/shared/types"
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"

export const useLikePostMutation = (): UseMutationResult<MessegeReturnType, Error, string> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => postService.likePostsById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SERVER_API_KEYS.POSTS] })
      queryClient.invalidateQueries({ queryKey: [SERVER_API_KEYS.MY_POSTS] })
    }
  })
}
