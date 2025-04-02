/* eslint-disable react/prop-types */
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

// icons
import profile from "../assets/03.jpg";

// utils
import { clearCookie } from "../utils/cookie";

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
        <div className="flex items-center gap-4">
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
            className="w-14 rounded-full object-cover cursor-pointer my-2"
            src={profile}
            alt="profile"
            onClick={logOut}
          />
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
