import { LoginData, RegisterData } from "@/core/interfaces/auth.interface";

export interface AuthContextType {
  isAuthenticated: boolean;
  register: (data: RegisterData) => void;
  login: (data: LoginData) => void;
  logout: () => void;
}
