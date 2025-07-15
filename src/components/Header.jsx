/* eslint-disable react/prop-types */
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

// icons
import profile from "../assets/prof-icon2.png";

// utils
import { clearCookie } from "../utils/cookie";
import { userAttr } from "../utils/userAttr";

function Header({ open, setOpen }) {
  const navigate = useNavigate();

  const toggleMenu = () => {
    setOpen(!open);
  };

  const logOut = async function () {
    clearCookie();
    toast.success("خارج شدید.");
    navigate("/login");
  };

  return (
    <header className="bg-secondary">
      <header className="flex items-center justify-between pl-8 size">
        {/* profile */}
        <div className="flex items-center gap-4 py-2">
          <div className="flex items-center gap-4 border-none p-2">
            {/* Hamburger Icon */}
            <button
              className="flex flex-col items-center justify-center w-8 h-8 space-y-1.5"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              <span
                className={`block h-0.5 w-6 bg-white transition-transform ${
                  open ? "transform rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-white transition-opacity ${
                  open ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-white transition-transform ${
                  open ? "transform -rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </button>
          </div>

          <img
            className="w-14 h-14 rounded-full object-cover cursor-pointer"
            src={profile}
            alt="profile"
            onClick={logOut}
          />

          <h5 className="text-base text-white">
           {userAttr().name}
          </h5>
        </div>

        {/* logo */}
        <h5 className="text-xl text-white">
          <Link to="/">یوتل کو</Link>
        </h5>
      </header>
    </header>
  );
}

export default Header;
