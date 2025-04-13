import { api } from "@/lib/api";
import { queryClient } from "@/lib/query";
import { queryKeys } from "@/lib/query-keys";
import { useMutation } from "@tanstack/react-query";

export interface SignUpRequest {
  email: string;
  name: string;
  password: string;
}

export interface SignUpResponse {
  data: null;
}

export async function SignUp(data: SignUpRequest): Promise<SignUpResponse> {
  return await api
    .post<SignUpResponse>("auth/register", {
      json: data,
    })
    .json();
}

export const useSignUp = () => {
  return useMutation({
    mutationFn: SignUp,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.auth() }),
  });
};
