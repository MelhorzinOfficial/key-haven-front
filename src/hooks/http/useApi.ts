import { VITE_API_URL } from "@/core/constants/base-url.constant";
import axios from "axios";
import { useMemo } from "react";

/**
 * Hook para usar uma instância do axios com o baseURL configurado e com credenciais
 * @returns Instância do axiosInstance
 */
export const useApi = () => {

  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: VITE_API_URL,
      withCredentials: true,
    });

    return instance;
  }, []);

  return axiosInstance;
};
