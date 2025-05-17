import { SERVER_API_KEYS } from "@/shared/service/api"
import { postService } from "@/shared/service/post.service"
import { MessegeReturnType } from "@/shared/types"
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"

export const useCreatePostMutation = (): UseMutationResult<MessegeReturnType, Error, string> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (content: string) => {
      const formData = new FormData()
      formData.append('content', content,)

      return postService.createPost(formData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SERVER_API_KEYS.POSTS] })
      queryClient.invalidateQueries({ queryKey: [SERVER_API_KEYS.MY_POSTS] })
    }
  })
}
