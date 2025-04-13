import { api } from "@/lib/api";
import { queryClient } from "@/lib/query";
import { queryKeys } from "@/lib/query-keys";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
  expiresIn: number;
}

export async function SignIn(data: SignInRequest): Promise<SignInResponse> {
  const response = await api
    .post<SignInResponse>("auth/login", {
      json: data,
    })
    .json();

  if (response.token) {
    Cookies.set("token", response.token, { expires: response.expiresIn / 86400 });
  }

  return response;
}

export const useSignIn = () => {
  return useMutation({
    mutationFn: SignIn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.auth() }),
  });
};
