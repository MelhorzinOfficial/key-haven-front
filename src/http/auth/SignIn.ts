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

/**
 * Authenticates a user by sending sign-in credentials and returns user and token information.
 *
 * If authentication is successful and a token is received, the token is stored in a cookie with an expiration based on the token's validity period.
 *
 * @param data - The user's sign-in credentials.
 * @returns The authenticated user's details, token, and token expiration duration.
 */
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
