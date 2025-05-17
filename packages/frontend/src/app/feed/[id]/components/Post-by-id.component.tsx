'use client'

import { useParams } from "next/navigation";
import { useGetPostByIdQuery } from "../../hooks/use-get-post-by-id-query.hook"

const PostById = () => {
  const { id } = useParams();
  const postId = id?.toString() ?? '';
  const { data } = useGetPostByIdQuery(postId)

  if (!id || !data) {
    return <div>Post not found</div>;
  }
  return (
    <section className="w-full max-w-md bg-white shadow-md rounded-2xl p-6">
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold text-gray-800 text-center">Post</h1>

        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Post id: {data?.id}</h2>
          <p className="text-gray-600 break-all">{data?.content}</p>
        </div>

        <div className="mt-6">
          <p className="text-gray-500 text-sm text-center">
            {data?.likes} Likes
          </p>
        </div>
      </div>
    </section>
  )
}

export default PostById
