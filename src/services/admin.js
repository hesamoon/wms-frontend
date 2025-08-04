import api from "../configs/api";

const getProducts = () => api.get("/getProducts");

const getProduct = (id) => api.get(`/getProduct/${id}`);

const getSoldProducts = () => api.get("/getSoldProducts");

const getUsers = () => api.get("/getUsers");

const addUser = (data) => api.post("/addUser", { ...data });

const getBuyers = () => api.get("/getBuyers");

const addBuyer = (data) => api.post("/addBuyer", { ...data });

const updateUser = (data) => api.post("/updateUser", { ...data });

const removeUser = (data) => api.post("/removeUser", { ...data });

const createProduct = (data) => api.post("/createProduct", { ...data });

const updateProduct = (data) => api.post("/updateProduct", { ...data });

const updatePaymentDetails = (data) =>
  api.post("/updatePaymentDetails", { ...data });

const removeProduct = (data) => api.post("/removeProduct", { ...data });

const sellProduct = (data) => api.post("/sellProduct", { ...data });

const getUser = (data) => api.post("/login", { ...data });

// Category APIs
const getCategories = () => api.get("/getCategories");

const getCategory = (id) => api.get(`/getCategory/${id}`);

const updateCategory = (data) => api.post("/updateCategory", { ...data });

const removeCategory = (data) => api.post("/removeCategory", { ...data });

const createCategory = (data) => api.post("/createCategory", { ...data });

export {
  getUsers,
  getProduct,
  getProducts,
  getSoldProducts,
  getUser,
  sellProduct,
  updateProduct,
  removeProduct,
  updatePaymentDetails,
  addUser,
  addBuyer,
  updateUser,
  removeUser,
  createProduct,
  getBuyers,
  getCategories,
  getCategory,
  updateCategory,
  removeCategory,
  createCategory,
};
