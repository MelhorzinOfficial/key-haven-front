import { api } from "@/lib/api";
import { queryClient } from "@/lib/query";
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

/**
 * Retrieves the currently authenticated user's data from the authentication API.
 *
 * @returns A promise that resolves to the current user's information.
 *
 * @throws {Error} If the request to fetch user data fails.
 */
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
