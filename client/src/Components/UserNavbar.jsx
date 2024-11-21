import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../Utils/axiosInstance";
import { useDispatch } from "react-redux";
import { setRole } from "../store/actions";

function UserNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = async () => {
    try {
      const res = await axiosInstance.post(import.meta.env.VITE_LOGOUT_API);
      if (res.status === 200) {
        console.log(res);
        dispatch(setRole(null));
        navigate("/Login");
        localStorage.removeItem("role");
        localStorage.removeItem("token");
      } else {
        console.log("something error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="mb-4 px-4 shadow-xl">
      <div className="relative mx-auto flex max-w-screen-lg flex-col py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/ViewPosts"
          className="flex items-center text-2xl font-bold text-blue-600"
        >
          User Dashboard
        </Link>
        <input className="peer hidden" type="checkbox" id="navbar-open" />
        <label
          className="absolute right-0 mt-2 cursor-pointer text-xl sm:hidden"
          htmlFor="navbar-open"
        >
          <span className="sr-only">Toggle Navigation</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="text-blue-600"
            viewBox="0 0 24 24"
          >
            <path d="M4 6h16a2 2 0 100-4H4a2 2 0 100 4zm0 7h16a2 2 0 100-4H4a2 2 0 100 4zm0 7h16a2 2 0 100-4H4a2 2 0 100 4z" />
          </svg>
        </label>
        <nav
          aria-label="Header Navigation"
          className="peer-checked:block hidden pl-2 py-6 sm:block sm:py-0"
        >
          <ul className="flex flex-col gap-y-4 sm:flex-row sm:gap-x-8 justify-center items-center">
            <li>
              <Link to="/ViewPosts">
                <span className="text-gray-600 hover:text-blue-600 transition duration-200">
                  Your Posts
                </span>
              </Link>
            </li>

            <li>
              <Link to="/AddPost">
                <span className="text-gray-600 hover:text-blue-600 transition duration-200">
                  Add New Post
                </span>
              </Link>
            </li>

            <li>
              <button
                onClick={logOut}
                className="rounded-xl border-2 border-blue-600 px-6 py-2 font-medium text-blue-600 hover:bg-blue-600 hover:text-white transition duration-200"
              >
                Log Out
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default UserNavbar;
