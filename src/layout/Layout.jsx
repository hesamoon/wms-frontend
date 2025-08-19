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
  const [selectedNavID, setSelectedNavID] = useState(null);

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
              {userAttr().role === "SUPER ADMIN"
                ? pageNames.map((item, index) => (
                    <div key={item.id}>
                      <div
                        className={`flex items-center justify-between ${
                          selectedNavID === item.id
                            ? "font-bold text-primary bg-secondary/10"
                            : "text-secondary"
                        } ${
                          open ? "gap-20" : "gap-6"
                        } p-4 cursor-pointer whitespace-nowrap transition-all duration-300 ease-in-out hover:bg-secondary/25 ${
                          index === 0 ? "rounded-t-lg" : null
                        }`}
                        onClick={() =>
                          selectedNavID === item.id
                            ? setSelectedNavID(null)
                            : setSelectedNavID(item.id)
                        }
                      >
                        {open ? (
                          <>
                            <div className="flex items-center gap-2">
                              {/* icon */}
                              {selectedNavID === item.id
                                ? item.actIcon
                                : item.inactIcon}
                              {/* name */}
                              {item.name}
                            </div>

                            <div
                              className={`transition-all duration-300 ease-in-out ${
                                selectedNavID === item.id ? "rotate-180" : null
                              }`}
                            >
                              <svg
                                width="8px"
                                height="5px"
                                viewBox="0 0 8 5"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g
                                  id="Icons"
                                  stroke="none"
                                  strokeWidth="1"
                                  fill="none"
                                  fillRule="evenodd"
                                >
                                  <g
                                    id="Rounded"
                                    transform="translate(-482.000000, -3442.000000)"
                                  >
                                    <g
                                      id="Navigation"
                                      transform="translate(100.000000, 3378.000000)"
                                    >
                                      <g
                                        id="-Round-/-Navigation-/-arrow_drop_down"
                                        transform="translate(374.000000, 54.000000)"
                                      >
                                        <g>
                                          <polygon
                                            id="Path"
                                            points="0 0 24 0 24 24 0 24"
                                          ></polygon>
                                          <path
                                            d="M8.71,11.71 L11.3,14.3 C11.69,14.69 12.32,14.69 12.71,14.3 L15.3,11.71 C15.93,11.08 15.48,10 14.59,10 L9.41,10 C8.52,10 8.08,11.08 8.71,11.71 Z"
                                            id="🔹-Icon-Color"
                                            fill={
                                              selectedNavID === item.id
                                                ? "#318dc1"
                                                : "#55768b"
                                            }
                                          ></path>
                                        </g>
                                      </g>
                                    </g>
                                  </g>
                                </g>
                              </svg>
                            </div>
                          </>
                        ) : // icon
                        selectedNavID === item.id ? (
                          item.actIcon
                        ) : (
                          item.inactIcon
                        )}
                      </div>

                      {selectedNavID === item.id
                        ? item.subPages.map((subItem) => (
                            <Link key={subItem.id} to={subItem.path}>
                              <div
                                className={`bg-secondary/10 transition-all duration-300 ease-in-out ${
                                  location.pathname === subItem.path
                                    ? "font-bold text-primary"
                                    : "text-secondary"
                                } p-4 mr-6 cursor-pointer whitespace-nowrap flex items-center gap-2 hover:bg-secondary/25`}
                              >
                                {/* icon */}
                                {/* {location.pathname === subItem.path
                                  ? subItem.actIcon
                                  : subItem.inactIcon} */}
                                <div
                                  className={`w-2.5 h-2.5 ${
                                    location.pathname === subItem.path
                                      ? "bg-[#318dc1]"
                                      : "bg-[#55768b]"
                                  } rounded-full`}
                                />

                                <h2
                                  className={`transition-all duration-300 ease-in-out ${
                                    open ? "flex" : "hidden"
                                  }`}
                                >
                                  {subItem.name}
                                </h2>
                              </div>
                            </Link>
                          ))
                        : null}
                    </div>
                  ))
                : pageNames
                    .filter((pn) => pn.id < 3)
                    .map((item, index) => (
                      <div key={item.id}>
                        <div
                          className={`flex items-center justify-between ${
                            selectedNavID === item.id
                              ? "font-bold text-primary bg-secondary/10"
                              : "text-secondary"
                          } ${
                            open ? "gap-20" : "gap-6"
                          } p-4 cursor-pointer whitespace-nowrap transition-all duration-300 ease-in-out hover:bg-secondary/25 ${
                            index === 0 ? "rounded-t-lg" : null
                          }`}
                          onClick={() =>
                            selectedNavID === item.id
                              ? setSelectedNavID(null)
                              : setSelectedNavID(item.id)
                          }
                        >
                          {open ? (
                            <>
                              <div className="flex items-center gap-2">
                                {/* icon */}
                                {selectedNavID === item.id
                                  ? item.actIcon
                                  : item.inactIcon}
                                {/* name */}
                                {item.name}
                              </div>

                              <div
                                className={`transition-all duration-300 ease-in-out ${
                                  selectedNavID === item.id
                                    ? "rotate-180"
                                    : null
                                }`}
                              >
                                <svg
                                  width="8px"
                                  height="5px"
                                  viewBox="0 0 8 5"
                                  version="1.1"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g
                                    id="Icons"
                                    stroke="none"
                                    strokeWidth="1"
                                    fill="none"
                                    fillRule="evenodd"
                                  >
                                    <g
                                      id="Rounded"
                                      transform="translate(-482.000000, -3442.000000)"
                                    >
                                      <g
                                        id="Navigation"
                                        transform="translate(100.000000, 3378.000000)"
                                      >
                                        <g
                                          id="-Round-/-Navigation-/-arrow_drop_down"
                                          transform="translate(374.000000, 54.000000)"
                                        >
                                          <g>
                                            <polygon
                                              id="Path"
                                              points="0 0 24 0 24 24 0 24"
                                            ></polygon>
                                            <path
                                              d="M8.71,11.71 L11.3,14.3 C11.69,14.69 12.32,14.69 12.71,14.3 L15.3,11.71 C15.93,11.08 15.48,10 14.59,10 L9.41,10 C8.52,10 8.08,11.08 8.71,11.71 Z"
                                              id="🔹-Icon-Color"
                                              fill={
                                                selectedNavID === item.id
                                                  ? "#318dc1"
                                                  : "#55768b"
                                              }
                                            ></path>
                                          </g>
                                        </g>
                                      </g>
                                    </g>
                                  </g>
                                </svg>
                              </div>
                            </>
                          ) : // icon
                          selectedNavID === item.id ? (
                            item.actIcon
                          ) : (
                            item.inactIcon
                          )}
                        </div>

                        {selectedNavID === item.id
                          ? item.subPages.map((subItem) => (
                              <Link key={subItem.id} to={subItem.path}>
                                <div
                                  className={`bg-secondary/10 transition-all duration-300 ease-in-out ${
                                    location.pathname === subItem.path
                                      ? "font-bold text-primary"
                                      : "text-secondary"
                                  } p-4 mr-6 cursor-pointer whitespace-nowrap flex items-center gap-2 hover:bg-secondary/25`}
                                >
                                  {/* icon */}
                                  {/* {location.pathname === subItem.path
                                    ? subItem.actIcon
                                    : subItem.inactIcon} */}
                                  <div
                                    className={`w-2.5 h-2.5 ${
                                      location.pathname === subItem.path
                                        ? "bg-[#318dc1]"
                                        : "bg-[#55768b]"
                                    } rounded-full`}
                                  />

                                  <h2
                                    className={`transition-all duration-300 ease-in-out ${
                                      open ? "flex" : "hidden"
                                    }`}
                                  >
                                    {subItem.name}
                                  </h2>
                                </div>
                              </Link>
                            ))
                          : null}
                      </div>
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
