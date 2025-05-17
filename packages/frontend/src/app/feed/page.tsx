import { Metadata } from "next"
import PostList from "./components/Post-list.component"

export const metadata: Metadata = {
  title: 'SN | Feed',
}

const Page = () => {
  return (
    <PostList />
  )
}

export default Page
