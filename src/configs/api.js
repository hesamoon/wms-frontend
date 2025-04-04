import axios from "axios";
// import { getCookie } from "../utilities/cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json"       
  },
  withCredentials: true,
});

// api.interceptors.request.use(
//   (request) => {
//     const accessToken = getCookie("accessToken");
//     if (accessToken) {
//       request.headers["Authorization"] = `bearer ${accessToken}`;
//     }

//     return request;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default api;
