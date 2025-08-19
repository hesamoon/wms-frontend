/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";

// icons
import arrowIcon from "../../assets/arrow-down.svg";

// modules
import Loader from "../modules/Loader";

function UserModal({
  isOpen,
  onClose,
  onAddUser,
  onUpdateUser,
  isLoading,
  userData = null,
  mode = "add",
}) {
  const [user, setUser] = useState({
    name: "",
    number: "",
    password: "",
    user_code: "",
    role: "",
  });
  const [openOptions, setOpenOptions] = useState(false);
  const [selRole, setSelRole] = useState("");
  const ref = useRef(null);

  // Initialize form with userData if provided (for update mode)
  useEffect(() => {
    if (userData && mode === "update") {
      setUser({
        name: userData.name || "",
        number: userData.number || "",
        password: userData.password || "",
        user_code: userData.user_code || "",
        role: userData.role || "",
      });
      setSelRole(userData.role || "");
    } else {
      setUser({
        name: "",
        number: "",
        password: "",
        user_code: "",
        role: "",
      });
      setSelRole("");
    }
  }, [userData, mode]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenOptions(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const selectOptionHandler = (role) => {
    setSelRole(role);
    setUser({ ...user, role });
    setOpenOptions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user.name.trim()) {
      toast.error("لطفا نام کاربر را وارد کنید!");
      return;
    }

    if (!user.number.trim()) {
      toast.error("لطفا نام کاربری را وارد کنید!");
      return;
    }

    if (!user.password.trim()) {
      toast.error("لطفا رمز عبور را وارد کنید!");
      return;
    }

    if (!user.user_code.trim()) {
      toast.error("لطفا شناسه کاربر را وارد کنید!");
      return;
    }

    if (!user.role.trim()) {
      toast.error("لطفا نقش کاربر را انتخاب کنید!");
      return;
    }

    if (mode === "add") {
      onAddUser(user);
    } else {
      onUpdateUser(user);
    }

    // Reset form
    setUser({
      name: "",
      number: "",
      password: "",
      user_code: "",
      role: "",
    });
    setSelRole("");
  };

  const handleClose = () => {
    setUser({
      name: "",
      number: "",
      password: "",
      user_code: "",
      role: "",
    });
    setSelRole("");
    setOpenOptions(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-bg_main rounded-xl p-6 w-[500px] max-w-[90vw]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-secondary font-bold text-lg">
            {mode === "add" ? "افزودن کاربر" : "بروزرسانی کاربر"}
          </h3>
          <button
            onClick={handleClose}
            className="text-secondary hover:text-primary transition-colors"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* user details */}
          {/* user role */}
          <div className="space-y-1 w-full">
            <label className="text-label_text text-sm">نقش کاربر *</label>
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
                      selRole === "SUPER ADMIN"
                        ? "bg-hover_primary text-primary font-bold"
                        : "text-secondary"
                    }`}
                    onClick={() => selectOptionHandler("SUPER ADMIN")}
                  >
                    SUPER ADMIN
                  </p>
                  <p
                    className={`p-1 cursor-pointer text-sm hover:bg-hover_primary ${
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

          {/* user name */}
          <div className="space-y-1 flex-1">
            <label className="text-label_text text-sm">نام *</label>
            <div className="bg-bg_input p-2 rounded-lg">
              <input
                className="bg-transparent w-full border-none outline-none text-secondary"
                type="text"
                placeholder="نام"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>
          </div>

          {/* user number */}
          <div className="space-y-1 flex-1">
            <label className="text-label_text text-sm">نام کاربری *</label>
            <div className="flex items-center gap-2 bg-bg_input p-2 rounded-lg">
              <input
                className="bg-transparent w-full border-none outline-none text-secondary text-start input_number"
                type="number"
                value={user.number}
                placeholder="نام کاربری"
                disabled={mode === "update"}
                onChange={(e) => setUser({ ...user, number: e.target.value })}
              />
            </div>
          </div>

          {/* user password */}
          <div className="space-y-1 flex-1">
            <label className="text-label_text text-sm">رمز عبور *</label>
            <div className="flex items-center gap-2 bg-bg_input p-2 rounded-lg">
              <input
                className="bg-transparent w-full border-none outline-none text-secondary text-start remove-arrow"
                type="text"
                value={user.password}
                placeholder="رمز عبور"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
          </div>

          {/* user code */}
          <div className="space-y-1 flex-1">
            <label className="text-label_text text-sm">شناسه کاربر *</label>
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

          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-bold hover:bg-gray-600 transition-colors"
            >
              انصراف
            </button>

            <button
              type="submit"
              disabled={
                isLoading ||
                !user.name ||
                !user.number ||
                !user.password ||
                !user.user_code ||
                !user.role
              }
              className={`flex-1 bg-secondary text-white py-3 rounded-lg font-bold transition-colors ${
                isLoading ||
                !user.name ||
                !user.number ||
                !user.password ||
                !user.user_code ||
                !user.role
                  ? "opacity-75"
                  : "hover:bg-secondary/90"
              }`}
            >
              {isLoading ? (
                <>
                  {mode === "add"
                    ? "در حال اضافه کردن..."
                    : "در حال بروزرسانی..."}
                  <Loader />
                </>
              ) : mode === "add" ? (
                "افزودن"
              ) : (
                "بروزرسانی"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserModal;
