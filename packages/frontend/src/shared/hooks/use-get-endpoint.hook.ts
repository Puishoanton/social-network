import { usePathname } from "next/navigation";

export const useGetEndpoint = () => {
  const pathname = usePathname();
  return pathname.split('/').filter(Boolean).at(-1);
}
