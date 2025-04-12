import { api } from "@/lib/api";
import { queryClient } from "@/lib/query";
import { queryKeys } from "@/lib/query-keys";
import { useMutation } from "@tanstack/react-query";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    name: string;
  };
  token: string;
  expiresIn: number;
}

export async function Login(data: LoginRequest): Promise<LoginResponse> {
  return await api
    .post<LoginResponse>("auth/login", {
      json: data,
    })
    .json();
}

export const useLogin = () => {
  return useMutation({
    mutationFn: Login,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.auth() }),
  });
};
