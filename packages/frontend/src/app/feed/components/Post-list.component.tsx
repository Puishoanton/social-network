'use client'
import { useGetPostsQuery } from "../hooks";
import Post from "./Post.component";

const PostList = () => {
  const { data: posts } = useGetPostsQuery()
  return (
    <section className="container mx-auto p-4 space-y-4">
      {posts?.length === 0 ? (
        <p className="text-center text-lg text-gray-500">No posts available.</p>
      ) : (
        posts?.map((post) => (
          <article key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <Post post={post} />
          </article>
        ))
      )}
    </section>
  );
};

export default PostList;
