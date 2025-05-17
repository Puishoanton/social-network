'use client';
import { useAuth } from '@/app/auth/hooks/use-auth-mutation.hook';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '../store';

export default function Header() {
  const { logout } = useAuth()
  const { isAuthenticated, setAuthenticated } = useAuthStore();
  const pathname = usePathname();

  const logoutHandler = () => {
    logout.mutate()
    setAuthenticated(false)
  }
  return (
    <header className="w-full bg-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link href="/feed" className="text-xl font-bold text-blue-600">
          SocialApp
        </Link>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            pathname === '/profile'
              ? <Link
                href="/feed"
                onClick={() => logoutHandler()}
                className={`text-sm font-medium text-gray-600 hover:text-blue-500`}
              >
                Logout
              </Link>
              : <Link
                href="/profile"
                className={`text-sm font-medium text-gray-600 hover:text-blue-500`}
              >
                Profile
              </Link>
          ) : (
            <Link
              href="/auth"
              className={`text-sm font-medium ${pathname === '/auth' ? 'text-blue-600' : 'text-gray-600'
                } hover:text-blue-500`}
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
