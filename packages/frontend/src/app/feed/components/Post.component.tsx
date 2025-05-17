import { useAuthStore } from '@/shared/store';
import { PostType } from '@/shared/types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLikePostMutation } from '../hooks/use-like-post-by-id-mutation.hook';

type Props = {
  post: PostType;
}

const Post: React.FC<Props> = ({ post }) => {
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()
  const { mutate: likeHandler } = useLikePostMutation()

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
      <header className="flex items-center p-4 border-b border-gray-200">
        <Image
          className="w-12 h-12 rounded-full object-cover mr-4"
          src={post.user.picture}
          alt={post.user.name}
          width={200}
          height={200}
        />
        <div>
          <Link
            href={`/feed/${post.id}`}
            className="block p-4 bg-gray-100 rounded hover:bg-gray-200">
            <h2 className="font-semibold text-lg text-gray-900">{post.user.name}</h2>
          </Link>
        </div>
      </header>

      <div className="p-4">
        <p className="text-base text-gray-800">{post.content}</p>
      </div>

      <footer className="flex items-center justify-between p-4 border-t border-gray-200">
        <span
          onClick={() => isAuthenticated ? likeHandler(post.id) : router.push('/auth')}
          className="text-sm text-gray-500 cursor-pointer">{post.likes} Likes</span>
      </footer>
    </article>
  );
};

export default Post;

