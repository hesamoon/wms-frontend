/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// components
import Header from "../components/Header";
import Footer from "../components/Footer";

// constant
import { pageNames } from "../constant/data.jsx";

// utils
import { userAttr } from "../utils/userAttr.js";

function Layout({ children }) {
  const location = useLocation();

  const [open, setOpen] = useState(true);

  return location.pathname === "/login" ? (
    <div className="flex justify-center items-center min-h-screen">
      {children}
    </div>
  ) : (
    <div className="min-h-screen flex flex-col justify-between overflow-x-hidden">
      <div className="overflow-auto">
        <Header open={open} setOpen={setOpen} />

        <div className="flex size">
          {/* hamburger menu */}
          <div className="bg-bg_main min-h-screen transition-all duration-300 ease-in-out rounded-lg my-2 mr-2">
            <div className="flex flex-col h-fit">
              {userAttr().role === "ADMIN"
                ? pageNames.map((item, index) => (
                    <Link key={index} to={item.path}>
                      <div
                        className={`${
                          location.pathname === item.path
                            ? "font-bold text-primary"
                            : "text-secondary"
                        } ${
                          open ? "pl-12" : null
                        } py-4 px-6 cursor-pointer whitespace-nowrap flex items-center gap-2 transition-all duration-300 ease-in-out`}
                      >
                        {/* icon */}
                        {location.pathname === item.path
                          ? item.actIcon
                          : item.inactIcon}

                        <h2
                          className={`transition-all duration-300 ease-in-out ${
                            open ? "flex" : "hidden"
                          }`}
                        >
                          {item.name}
                        </h2>
                      </div>
                    </Link>
                  ))
                : pageNames
                    .filter((pn) => pn.path !== "/users")
                    .map((item, index) => (
                      <Link key={index} to={item.path}>
                        <h2
                          className={`${
                            location.pathname === item.path
                              ? "font-bold text-primary"
                              : "text-secondary"
                          } ${
                            open ? "pl-20" : "pl-6"
                          } p-4 cursor-pointer whitespace-nowrap transition duration-300 ease-in-out`}
                        >
                          {open ? (
                            <div className="flex items-center gap-2">
                              {/* icon */}
                              {location.pathname === item.path
                                ? item.actIcon
                                : item.inactIcon}
                              {item.name}
                            </div>
                          ) : // icon
                          location.pathname === item.path ? (
                            item.actIcon
                          ) : (
                            item.inactIcon
                          )}
                        </h2>
                      </Link>
                    ))}
            </div>
          </div>

          {/* details */}
          {children}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Layout;
