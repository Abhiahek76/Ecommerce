import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../State/Action";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserMenu = () => {
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Logged out successfully!", {
      position: "top-center",
      autoClose: 3000,
    });
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  if (!isLoggedIn || !user) return null;

  return (
    <div className="p-4 bg-white rounded-lg w-64">
      <ToastContainer position="top-center" autoClose={3000} />
      <p className="text-xl font-semibold mb-1">👋 {user.name}</p>

      <div className="mt-4 flex flex-col gap-2">
        <Link to="/dashboard/profile" className="text-blue-600 hover:underline">
          View Profile
        </Link>
        <Link to="/dashboard/orders" className="text-blue-600 hover:underline">
          My Orders
        </Link>
        <Link to="/dashboard/address" className="text-blue-600 hover:underline">
          Address
        </Link>
        <button
          onClick={handleLogout}
          className="text-red-500 hover:underline text-left"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
