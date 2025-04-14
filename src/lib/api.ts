import ky from "ky";
import Cookies from "js-cookie";

const baseUrl = "https://apihk-develop.melhorzin.com";

export const api = ky.create({
  prefixUrl: baseUrl,
  hooks: {
    beforeRequest: [
      (request) => {
        const token = Cookies.get("token");
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
        return request;
      },
    ],
  },
});
