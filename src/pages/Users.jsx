import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// icons
import arrowIcon from "../assets/arrow-down.svg";

// modules
import Loader from "../components/modules/Loader";

// services
import { addUser, getUsers, removeUser, updateUser } from "../services/admin";

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
  const { mutate: updateUserMutate, isPending: updateUserPending } =
    useMutation({
      mutationFn: updateUser,
      onSuccess: (data) => {
        queryClient.invalidateQueries("users");
        toast.success(`کاربر با نام کاربری ${user.number} بروزرسانی گردید.`);
        setSelectedUser({
          op: "a",
          username: "",
        });
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
  const { mutate: removeUserMutate, isPending: removeUserPending } =
    useMutation({
      mutationFn: removeUser,
      onSuccess: (data) => {
        queryClient.invalidateQueries("users");
        toast.success(`کاربر با شناسه ${data.data?.user_code} حذف گردید.`);
      },
      onError: (err) => {
        console.log(err);
      },
    });

  const [selRole, setSelRole] = useState(null);
  const [openOptions, setOpenOptions] = useState(false);
  const [selectedUser, setSelectedUser] = useState({
    op: "a",
    username: "",
  });
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

  const opUserClickHandler = () => {
    switch (selectedUser.op) {
      case "a":
        addUserMutate({ ...user });
        break;
      case "u":
        updateUserMutate({ ...user });
        break;

      default:
        break;
    }
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
                <th className="text-secondary py-2 px-6 text-start">عملیات</th>
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
                  <td className={`font-semibold py-2 px-6`}>
                    {/* update btn */}
                    <button
                      onClick={() => {
                        if (
                          selectedUser.op !== "u" &&
                          selectedUser.username !== user.number
                        ) {
                          setSelectedUser({ op: "u", username: user.number });
                          setUser({ ...user });
                          setSelRole(user.role)
                        } else {
                          setSelectedUser({
                            op: "a",
                            username: "",
                          });
                          setUser({
                            name: "",
                            number: "",
                            password: "",
                            user_code: "",
                            role: "",
                          });
                          setSelRole(null)
                        }
                      }}
                    >
                      {selectedUser.op === "u" &&
                      selectedUser.username === user.number ? (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18 6L6 18"
                            stroke="#33363F"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6 6L18 18"
                            stroke="#33363F"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.92971 19.283L5.92972 19.283L5.95149 19.2775L5.95151 19.2775L8.58384 18.6194C8.59896 18.6156 8.61396 18.6119 8.62885 18.6082C8.85159 18.5528 9.04877 18.5037 9.2278 18.4023C9.40683 18.301 9.55035 18.1571 9.71248 17.9947C9.72332 17.9838 9.73425 17.9729 9.74527 17.9618L16.9393 10.7678L16.9393 10.7678L16.9626 10.7445C17.2761 10.4311 17.5461 10.1611 17.7333 9.91573C17.9339 9.65281 18.0858 9.36038 18.0858 9C18.0858 8.63961 17.9339 8.34719 17.7333 8.08427C17.5461 7.83894 17.276 7.5689 16.9626 7.2555L16.9393 7.23223L16.5858 7.58579L16.9393 7.23223L16.7678 7.06066L16.7445 7.03738C16.4311 6.72395 16.1611 6.45388 15.9157 6.2667C15.6528 6.0661 15.3604 5.91421 15 5.91421C14.6396 5.91421 14.3472 6.0661 14.0843 6.2667C13.8389 6.45388 13.5689 6.72395 13.2555 7.03739L13.2322 7.06066L6.03816 14.2547C6.02714 14.2658 6.01619 14.2767 6.00533 14.2875C5.84286 14.4496 5.69903 14.5932 5.59766 14.7722C5.4963 14.9512 5.44723 15.1484 5.39179 15.3711C5.38809 15.386 5.38435 15.401 5.38057 15.4162L4.71704 18.0703C4.71483 18.0791 4.7126 18.088 4.71036 18.097C4.67112 18.2537 4.62921 18.421 4.61546 18.5615C4.60032 18.7163 4.60385 18.9773 4.81326 19.1867C5.02267 19.3961 5.28373 19.3997 5.43846 19.3845C5.57899 19.3708 5.74633 19.3289 5.90301 19.2896C5.91195 19.2874 5.92085 19.2852 5.92971 19.283Z"
                            stroke="#222222"
                          />
                          <path
                            d="M12.5 7.5L15.5 5.5L18.5 8.5L16.5 11.5L12.5 7.5Z"
                            fill="#222222"
                          />
                        </svg>
                      )}
                    </button>

                    {/* remove btn */}
                    <button
                      className="mr-2"
                      onClick={() => removeUserMutate({ ...user })}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 15L10 12"
                          stroke="#C62828"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M14 15L14 12"
                          stroke="#C62828"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M3 7H21V7C20.0681 7 19.6022 7 19.2346 7.15224C18.7446 7.35523 18.3552 7.74458 18.1522 8.23463C18 8.60218 18 9.06812 18 10V16C18 17.8856 18 18.8284 17.4142 19.4142C16.8284 20 15.8856 20 14 20H10C8.11438 20 7.17157 20 6.58579 19.4142C6 18.8284 6 17.8856 6 16V10C6 9.06812 6 8.60218 5.84776 8.23463C5.64477 7.74458 5.25542 7.35523 4.76537 7.15224C4.39782 7 3.93188 7 3 7V7Z"
                          stroke="#C62828"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M10.0681 3.37059C10.1821 3.26427 10.4332 3.17033 10.7825 3.10332C11.1318 3.03632 11.5597 3 12 3C12.4403 3 12.8682 3.03632 13.2175 3.10332C13.5668 3.17033 13.8179 3.26427 13.9319 3.37059"
                          stroke="#C62828"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
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

      {/* form for add, update and remove user */}
      <div className="space-y-4">
        {/* title */}
        <h3
          className={`font-bold text-lg transition-transform duration-300 ease-in-out text-secondary`}
        >
          {selectedUser.op === "a"
            ? "افزودن کاربر"
            : selectedUser.op === "u"
            ? "بروزرسانی کاربر"
            : ""}
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
                addUserPending || updateUserPending ? "opacity-75" : null
              }`}
              disabled={addUserPending || updateUserPending}
              onClick={opUserClickHandler}
            >
              {selectedUser.op === "a"
                ? "افزودن"
                : selectedUser.op === "u"
                ? "بروزرسانی"
                : ""}
              {(addUserPending || updateUserPending) && <Loader />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
