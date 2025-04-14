import { api } from "@/lib/api";
import { queryClient } from "@/lib/query";
import { queryKeys } from "@/lib/query-keys";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export interface LogoutResponse {
  data: null;
}

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
