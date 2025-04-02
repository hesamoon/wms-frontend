import { jwtDecode } from "jwt-decode";
import { getCookie } from "./cookie";

const userAttr = () =>
  getCookie("token") === "undefined" ||
  getCookie("token") === undefined ||
  getCookie("token") === ""
    ? { role: "UNSIGNED" }
    : jwtDecode(getCookie("token"));

export { userAttr };
