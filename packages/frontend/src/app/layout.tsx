'use client'
import Header from "@/shared/components/Header.component";
import { AuthProvider } from "@/shared/providers/Auth.provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import './globals.css';

type Props = {
  children: React.ReactNode
}

const queryClient = new QueryClient()

export default function RootLayout({ children, }: Readonly<Props>) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <body>
            <Header />
            {children}
            <Toaster position="top-right" reverseOrder={false} />
          </body>
        </AuthProvider>
      </QueryClientProvider>
    </html>
  );
}
