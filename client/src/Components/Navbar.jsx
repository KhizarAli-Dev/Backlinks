import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { LuUsers } from "react-icons/lu";
import { AiOutlineFileAdd } from "react-icons/ai";
import { AiOutlineUserAdd } from "react-icons/ai";
import axiosInstance from "../Utils/axiosInstance";
import { useDispatch } from "react-redux";
import { setRole } from "../store/actions"; // Import the setRole action

function Navbar() {
  let Links = [
    { name: "ADD USER", link: "/AddUser" },
    { name: "USERS", link: "/Users" },
    { name: "POSTS", link: "/Posts" },
  ];

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = async () => {
    try {
      const res = await axiosInstance.post(import.meta.env.VITE_LOGOUT_API);
      if (res.status === 200) {
        // console.log(res);
        dispatch(setRole(null))
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
    <>
      <div className="shadow-md w-full fixed top-0 left-0 z-10">
        <div className="md:flex items-center justify-between bg-[#16222A] py-4 md:px-10 px-7">
          {/* Logo Section */}
          <div className="font-semibold text-2xl cursor-pointer flex items-center text-white">
            Admin Dashboard
          </div>

          {/* Hamburger Menu Icon for Mobile */}
          <div
            onClick={() => setOpen(!open)}
            className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden text-white"
          >
            {open ? <RxCross2 /> : <FaBars />}
          </div>

          {/* Menu Links */}
          <ul
            className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-[#16222A] md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in-out ${
              open ? "top-20 " : "top-[-490px]"
            }`}
          >
            {/* Map through Links */}
            {Links.map((link) => (
              <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
                <Link
                  to={link.link}
                  className="text-white hover:text-yellow-500 flex items-center"
                  onClick={() => setOpen(false)} // Close the menu when clicking on a link
                >
                  {/* Display Users icon only for the USERS link */}
                  {link.name === "USERS" && (
                    <LuUsers size={20} className="mr-2" />
                  )}
                  {link.name === "POSTS" && (
                    <AiOutlineFileAdd size={20} className="mr-2" />
                  )}
                  {link.name === "ADD USER" && (
                    <AiOutlineUserAdd size={20} className="mr-2" />
                  )}

                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <button
                className="bg-[#EF3B36] text-white rounded-lg px-3 py-1 uppercase ml-3 hover:opacity-90 text-center"
                onClick={logOut}
              >
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
