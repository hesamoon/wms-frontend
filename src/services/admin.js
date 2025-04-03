import api from "../configs/api";

const getProducts = () => api.get("/getProducts");

const getProduct = (id) => api.get(`/getProduct/${id}`);

const getSoldProducts = () => api.get("/getSoldProducts");

const getUsers = () => api.get("/getUsers");

const addUser = (data) => api.post("/addUser", { ...data });

const updateUser = (data) => api.post("/updateUser", { ...data });

const removeUser = (data) => api.post("/removeUser", { ...data });

const createProduct = (data) => api.post("/createProduct", { ...data });

const updateProduct = (data) => api.post("/updateProduct", { ...data });

const removeProduct = (data) => api.post("/removeProduct", { ...data });

const sellProduct = (data) => api.post("/sellProduct", { ...data });

const getUser = (data) => api.post("/login", { ...data });

export {
  getUsers,
  getProduct,
  getProducts,
  getSoldProducts,
  getUser,
  sellProduct,
  createProduct,
  updateProduct,
  removeProduct,
  addUser,
  updateUser,
  removeUser,
};
