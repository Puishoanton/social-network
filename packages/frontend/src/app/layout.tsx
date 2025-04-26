'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './globals.css';

type Props = {
  children: React.ReactNode
}

const queryClient = new QueryClient()

export default function RootLayout({ children, }: Readonly<Props>) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body>
          {children}
        </body>
      </QueryClientProvider>
    </html>
  );
}
