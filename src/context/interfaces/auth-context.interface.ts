import { LoginData, RegisterData } from "@/core/interfaces/auth.interface";

export interface AuthContextType {
  /**
   * Indicates whether the user is authenticated
   * @type {boolean}
   */
  isAuthenticated: boolean;

  /**
   * Registers a new user with the provided registration data
   * @param data - User registration information
   */
  register: (data: RegisterData) => void;

  /**
   * Logs in a user with the provided login data
   * @param data - User login information
   * @throws Will throw an error if the login fails
   */
  login: (data: LoginData) => void;

  /**
   * Logs out the current user
   * @throws Will throw an error if the logout fails
   */
  logout: () => void;
}
