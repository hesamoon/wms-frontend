import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// icons
import arrowIcon from "../assets/arrow-down.svg";

// modules
import Loader from "../components/modules/Loader";

// services
import { addUser, getUsers } from "../services/admin";
import toast from "react-hot-toast";

function Users() {
  const queryClient = useQueryClient();

  // GET
  const { data: usersData, isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // POST
  const { mutate: addUserMutate, isPending: addUserPending } = useMutation({
    mutationFn: addUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries("users");
      toast.success(`کاربر با نام کاربری ${user.number} ایجاد گردید.`);
      setUser({
        name: "",
        number: "",
        password: "",
        user_code: "",
        role: "",
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const [selRole, setSelRole] = useState(null);
  const [openOptions, setOpenOptions] = useState(false);
  const [user, setUser] = useState({
    name: "",
    number: "",
    password: "",
    user_code: "",
    role: "",
  });

  const ref = useRef(null);

  const selectOptionHandler = (role) => {
    setSelRole(role);
    setUser({ ...user, role });
    setOpenOptions(false);
  };

  const addUserClickHandler = () => {
    addUserMutate({ ...user });
  };

  // handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        openOptions && setOpenOptions(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [openOptions]);

  return (
    <div className={`flex flex-col gap-6 p-8 w-full`}>
      {/* title */}
      <h2
        className={`font-bold text-2xl transition-transform duration-300 ease-in-out text-secondary`}
      >
        کاربران
      </h2>

      {/* data list */}
      <div className="bg-bg_main rounded-xl max-h-[15rem] overflow-auto">
        {usersLoading ? (
          <Loader />
        ) : usersData?.data.length > 0 ? (
          <table className="w-full relative">
            <thead className="shadow-md shadow-hover_primary sticky top-0 bg-bg_main">
              <tr>
                <th className="w-[0px] text-secondary py-2 px-6 text-start">
                  ردیف
                </th>
                <th className="text-secondary py-2 px-6 text-start">نام</th>
                <th className="text-secondary py-2 px-6 text-start">
                  نام کاربری
                </th>
                <th className="text-secondary py-2 px-6 text-start">
                  رمز عبور
                </th>
                <th className="text-secondary py-2 px-6 text-start">
                  شناسه کاربر
                </th>

                <th className="text-secondary py-2 px-6 text-start">
                  نقش کاربر
                </th>
              </tr>
            </thead>
            <tbody>
              {usersData?.data.map((user, index) => (
                <tr key={user.object_id}>
                  <td
                    className={`text-secondary font-semibold text-center py-2 px-6`}
                  >
                    {index + 1}
                  </td>
                  <td className={`text-secondary font-semibold py-2 px-6`}>
                    {user.name}
                  </td>
                  <td className={`font-semibold py-2 px-6 text-secondary`}>
                    {user.number}
                  </td>
                  <td className={`font-semibold py-2 px-6 text-secondary`}>
                    {user.password}
                  </td>
                  <td className={`font-semibold py-2 px-6 text-secondary`}>
                    {user.user_code}
                  </td>
                  <td className={`font-semibold py-2 px-6 text-secondary`}>
                    {user.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h1 className="text-center font-bold text-secondary py-4">
            کاربری وجود ندارد.
          </h1>
        )}
      </div>

      <div className="space-y-4">
        <h3
          className={`font-bold text-lg transition-transform duration-300 ease-in-out text-secondary`}
        >
          افزودن کاربر
        </h3>

        {/* add new user */}
        <div className="bg-bg_main rounded-xl p-4 space-y-10">
          {/* user details */}
          <div className="flex items-center gap-4 w-full">
            {/* user name */}
            <div className="space-y-1 flex-1">
              <label className="text-label_text">نام</label>
              <div className="bg-bg_input p-2 rounded-lg">
                <input
                  className="bg-transparent w-full border-none outline-none text-secondary"
                  type="text"
                  placeholder="نام"
                  value={user.name}
                  onChange={(e) =>
                    e.target.value
                      ? setUser({ ...user, name: e.target.value })
                      : ""
                  }
                />
              </div>
            </div>

            {/* user number */}
            <div className="space-y-1 flex-1">
              <label className="text-label_text">نام کاربری</label>
              <div className="flex items-center gap-2 bg-bg_input p-2 rounded-lg">
                <input
                  className="bg-transparent w-full border-none outline-none text-secondary text-start input_number"
                  type="number"
                  value={user.number}
                  placeholder="نام کاربری"
                  onChange={(e) => setUser({ ...user, number: e.target.value })}
                />
              </div>
            </div>

            {/* user password */}
            <div className="space-y-1 flex-1">
              <label className="text-label_text">رمز عبور</label>
              <div className="flex items-center gap-2 bg-bg_input p-2 rounded-lg">
                <input
                  className="bg-transparent w-full border-none outline-none text-secondary text-start remove-arrow"
                  type="text"
                  value={user.password}
                  placeholder="رمز عبور"
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </div>
            </div>

            {/* user code */}
            <div className="space-y-1 flex-1">
              <label className="text-label_text">شناسه کاربر</label>
              <div className="flex items-center gap-2 bg-bg_input p-2 rounded-lg">
                <input
                  className="bg-transparent w-full border-none text-secondary outline-none text-start remove-arrow"
                  type="text"
                  value={user.user_code}
                  placeholder="شناسه کاربر"
                  onChange={(e) =>
                    setUser({ ...user, user_code: e.target.value })
                  }
                />
              </div>
            </div>

            {/* user role */}
            <div className="space-y-1 flex-1">
              <label className="text-label_text">نقش کاربر</label>
              <div className="relative" ref={ref}>
                <div
                  className="flex items-center justify-between bg-bg_input py-2 px-3 rounded-lg cursor-pointer w-full"
                  onClick={() => setOpenOptions((prev) => !prev)}
                >
                  <span
                    className={`text-sm ${
                      user?.role
                        ? "text-primary font-bold"
                        : "text-label_text_alpha10"
                    }`}
                  >
                    {user?.role ? user?.role : "انتخاب کنید"}
                  </span>
                  <img
                    className={`${openOptions ? "rotate-180" : ""}`}
                    src={arrowIcon}
                    alt="arrow"
                  />
                </div>

                {openOptions && (
                  <div className="absolute z-[999] top-11 bg-bg_input rounded-lg w-full shadow-md">
                    <p
                      className={`p-1 rounded-t-lg cursor-pointer text-sm hover:bg-hover_primary ${
                        selRole === "ADMIN"
                          ? "bg-hover_primary text-primary font-bold"
                          : "text-secondary"
                      }`}
                      onClick={() => selectOptionHandler("ADMIN")}
                    >
                      ADMIN
                    </p>
                    <p
                      className={`p-1 rounded-b-lg cursor-pointer text-sm hover:bg-hover_primary ${
                        selRole === "SELLER"
                          ? "bg-hover_primary text-primary font-bold"
                          : "text-secondary"
                      }`}
                      onClick={() => selectOptionHandler("SELLER")}
                    >
                      SELLER
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* add user btn */}
          <div className="flex items-center justify-end">
            <button
              className={`bg-secondary rounded-lg w-32 h-12 font-bold text-white text-base flex items-center justify-center gap-4 ${
                addUserPending ? "opacity-75" : null
              }`}
              disabled={addUserPending}
              onClick={addUserClickHandler}
            >
              افزودن
              {addUserPending && <Loader />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
