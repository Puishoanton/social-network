import { useAuthStore } from '@/shared/store'
import Image from 'next/image'

const User = () => {
  const { user, isLoading } = useAuthStore()
  if (user === undefined || isLoading) return

  return (
    <section className="flex flex-col items-center mb-8">
      <Image
        priority
        src={user.picture}
        alt={user.name}
        className="w-24 h-24 rounded-full object-cover mb-4 shadow-md"
        height={200}
        width={200}
      />
      <h1 className="text-2xl font-bold">{user.name}</h1>
      <p className="text-gray-500">{user.email}</p>
    </section>
  )
}

export default User
