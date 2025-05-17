import Post from '@/app/feed/components/Post.component'
import { useGetPostsByUserIdQuery } from '@/app/feed/hooks/use-get-posts-by-user-id-query.hook'

const MyPosts = () => {
  const { data: posts } = useGetPostsByUserIdQuery()

  if (posts === undefined) return
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">My posts</h2>

      {posts?.length > 0 ? (
        <ul className="space-y-4">
          {posts!.map((post) => (
            <li key={post.content}>
              <Post post={post} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">You have not posts</p>
      )}
    </section>
  )
}

export default MyPosts
