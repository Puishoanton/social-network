'use client';
import MyPosts from './My-posts.component';
import CreatePost from './Create-post.component';
import User from './User.component';

const Profile = () => {
  return (
    <main className="max-w-2xl mx-auto p-4">
      <User />
      <CreatePost />
      <MyPosts />
    </main>
  )
}

export default Profile
