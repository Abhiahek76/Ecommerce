import React from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoArrowBack } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import Search from "./Search";
import useMobile from "../hooks/usemobile";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { loadUserFromToken } from "../State/Action";
import { useEffect, useState, useRef } from "react";
//import { logoutUser, loadUserFromToken } from "../State/Action";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import UserMenu from "./usermanu";
import UserMenuMobile from "./usermanumobile";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const isMobile = useMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const toggleDropdown = () => setOpen((prev) => !prev);
  //const { user } = useSelector((state) => state.auth);
  // ✅ Get login state directly from Redux
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  //useEffect(() => {
  //setOpen(false);
  //}, [user]);
  // Always keep the array consistent
  useEffect(() => {
    dispatch(loadUserFromToken());
  }, [dispatch]);
  const isSearchPage = location.pathname === "/search";

  const handleClick = () => {
    if (isLoggedIn) {
      setShowMenu(!showMenu);
      // navigate("/user");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="bg-white md:h-28 lg:h-20 lg:shadow-md lg:px-20 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/*Logo or Back Button */}
        {isMobile && isSearchPage ? (
          <button
            className="text-black text-xl p-2"
            onClick={() => navigate("/")}
          >
            <IoArrowBack size={24} />
          </button>
        ) : (
          <div className="flex items-center space-x-2">
            <span className="text-yellow-500 font-bold text-2xl">Ecomm</span>
            <span className="text-green-600 font-bold text-2xl">erce</span>
          </div>
        )}

        {/* Desktop Search */}
        <div className="hidden lg:block">
          <Search />
        </div>

        {/* Icons=============================================== */}
        <div className="flex items-center space-x-4">
          {/* Mobile User Icon & Dropdown */}
          <div className="relative lg:hidden">
            <button onClick={handleClick}>
              <FaRegCircleUser size={20} />
            </button>
            {isLoggedIn && showMenu && (
              <div className="absolute right-0 mt-2 z-50 bg-white border rounded shadow-md">
                <UserMenuMobile />
              </div>
            )}
          </div>

          <div className="hidden lg:block">
            <div className="flex gap-10 items-center">
              {isLoggedIn ? (
                <div className="relative">
                  <div
                    onClick={toggleDropdown}
                    className="flex items-center gap-2 px-4 py-2 border hover:bg-gray-100 rounded-md cursor-pointer transition"
                  >
                    <p className="text-gray-700 font-medium">Account</p>
                    {open ? (
                      <GoChevronUp
                        size={20}
                        className="text-gray-600  animate-bounce"
                      />
                    ) : (
                      <GoChevronDown
                        size={20}
                        className="text-gray-600 animate-bounce"
                      />
                    )}
                  </div>

                  {open && (
                    <div className="absolute  right-0 top-full mt-2 z-50">
                      <div className="">
                        <UserMenu />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() =>
                    navigate("/login", { state: { from: location.pathname } })
                  }
                  className="text-gray-700 font-medium"
                >
                  Login
                </button>
              )}

              {/* Cart Button */}
              <div className="flex items-center bg-green-700 text-white px-4 py-2 rounded-md">
                <button className="flex items-center animate-bounce">
                  <FaCartPlus size={30} />
                </button>
                <div className="ml-2">
                  <p className="font-semibold">My Cart</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      {isMobile && (
        <div className="flex justify-center lg:hidden">
          <Search />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
