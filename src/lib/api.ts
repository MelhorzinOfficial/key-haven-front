import ky from "ky";
import Cookies from "js-cookie";

export const API_BASE_URL = "https://apihk-develop.melhorzin.com";

export const api = ky.create({
  prefixUrl: API_BASE_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        const token = Cookies.get("token");

        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
  },
});
