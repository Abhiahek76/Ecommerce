import React from "react";
import { IoSearch } from "react-icons/io5";
import { TypeAnimation } from "react-type-animation";
import { useNavigate, useLocation } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isSearchPage = location.pathname === "/search"; // Check current page

  return (
    <div className="flex items-center border rounded-md w-80 h-10 px-2 ">
      {/* If on Search Page, Show Input Box */}
      {isSearchPage ? (
        <input
          type="text"
          className="w-full h-full outline-none text-gray-600 px-2 text-sm "
          placeholder="Search..."
          autoFocus // Auto-focuses when on the search page
        />
      ) : (
        // Otherwise, Show Search Button with Animated Text
        <div
          className="flex items-center w-full h-full cursor-pointer"
          onClick={() => navigate("/search")}
        >
          <button className="w-10 h-10 flex items-center justify-center">
            <IoSearch size={18} className="text-gray-500" />
          </button>
          <span className="text-gray-400 text-sm truncate">
            <TypeAnimation
              sequence={[
                'Search "milk"',
                1000,
                'Search "bread"',
                1000,
                'Search "sugar"',
                1000,
                'Search "paneer"',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </span>
        </div>
      )}
    </div>
  );
};

export default Search;
