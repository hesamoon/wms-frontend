import { userAttr } from "../utils/userAttr";

/* eslint-disable react/prop-types */
function RoleBased({ children }) {
  const user = userAttr();

  return ["SUPER ADMIN"].includes(user?.role) ? children : null;
}

export default RoleBased;
