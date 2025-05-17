import { Metadata } from 'next';
import PostById from './components/Post-by-id.component';

type Props = {
  params: Promise<{ id: string }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { id } = await params;
  return {
    title: `SN | Post ${id}`,
  };
};
export default function PostPage() {


  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <PostById />
    </main>
  );
}
