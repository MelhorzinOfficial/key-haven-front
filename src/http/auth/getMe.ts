import { api } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface GetMeResponse {
  user: User;
}

export async function getMe(): Promise<GetMeResponse> {
  try {
    return await api.get<GetMeResponse>("auth/me").json();
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    throw error;
  }
}

export const useGetMe = () => {
  return useQuery({
    queryKey: queryKeys.user(),
    queryFn: getMe,
    retry: false,
    refetchOnWindowFocus: true,
  });
};
