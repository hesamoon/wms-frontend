import api from "../configs/api";

const getProducts = () => api.get("/");

export { getProducts };
