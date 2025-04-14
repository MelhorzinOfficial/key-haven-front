import { api } from "@/lib/api";
import { queryClient } from "@/lib/query";
import { queryKeys } from "@/lib/query-keys";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export interface LogoutResponse {
  data: null;
}

/**
 * Logs out the current user by sending a logout request and removing the authentication token cookie.
 *
 * @returns The logout response with a `data` property set to `null`.
 *
 * @throws {Error} If the logout request fails, the error is rethrown after removing the token cookie.
 */
export async function Logout(): Promise<LogoutResponse> {
  try {
    const response = await api.post<LogoutResponse>("auth/logout").json();

    Cookies.remove("token");

    return response;
  } catch (error) {
    Cookies.remove("token");
    throw error;
  }
}

export const useLogout = () => {
  return useMutation({
    mutationFn: Logout,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.auth() }),
  });
};
