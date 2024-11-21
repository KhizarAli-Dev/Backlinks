import React, { useEffect, useMemo, useState } from "react";
import axiosInstance from "../../../Utils/axiosInstance";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserNavbar from "../../../Components/UserNavbar";

function ReadPost() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const itemsPerPage = 5; // Set the number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [postCount, setPostCount] = useState(0);
  const [limit, setLimit] = useState(0);

  // Fetching All Records
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          import.meta.env.VITE_USERPOST_API
        );
        setData(response.data.data.usersPost);
        setPostCount(response.data.data.postCount);
        setLimit(response.data.data.userLimit)
        console.log(response.data.data.userLimit)

      } catch (error) {
        console.log("Error in data", error);
      }
    };
    fetchData();
  }, []);

  // Search Filters
  const filteredData = useMemo(() => {
    return data.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  // Calculate total posts
  const totalPosts = filteredData.length;
  const totalPages = Math.ceil(totalPosts / itemsPerPage);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <ToastContainer />

      <UserNavbar />

      <div className=" flex flex-col sm:flex-row items-center justify-between py-3 px-4 sm:px-8 bg-gradient-to-r from-slate-900 to-slate-700 w-full space-y-3 sm:space-y-0">
        <input
          className="outline-none rounded-lg sm:px-1 sm:py-0 md:px-2 md:py-1 md:w-[25%]"
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* <div className="text-white font-semibold  uppercase">
          <h2 className="text-lg">Total Posts: {totalPosts}</h2>
        </div> */}
        <div className="relative">
          <button
            onClick={() => setModalOpen(!isModalOpen)}
            className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
          >
            Post Details
          </button>
          <ModalBox
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            postCount={postCount}
            limit={limit}

          />
        </div>
      </div>

      {/* Total Post Count */}

      {/* Table */}
      <div className="flex items-center justify-center ">
        <div className="w-[95vw] relative overflow-x-auto shadow-lg sm:rounded-lg mt-6 transition-all duration-500 ease-in-out">
          <table className="w-full text-sm text-center text-gray-500">
            <thead className="text-xs text-white uppercase bg-gradient-to-r from-blue-600 to-indigo-700 h-12">
              <tr>
                <th className="px-6 py-3 border-b">Title</th>
                <th className="px-6 py-3 border-b">Description</th>
                <th className="px-6 py-3 border-b">Image</th>
                <th className="px-6 py-3 border-b">URL</th>
                <th className="px-6 py-3 border-b">Approval</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.length > 0 ? (
                paginatedData.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 transition-all ease-in-out hover:-translate-y-2 hover:text-white hover:bg-gradient-to-r from-cyan-400 to-blue-400 duration-300"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {item.title}
                    </td>
                    <td className="px-6 py-4">{item.description}</td>
                    <td className="px-6 py-1">
                      <div className="w-full flex items-center justify-center">
                        <img
                          src={item.image}
                          alt="image"
                          className="w-16 h-16 object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        target="_blank"
                        href={item.url}
                        className="text-blue-700 hover:underline"
                      >
                        {item.url_name}
                      </a>
                    </td>

                    <td
                      className={`px-6 py-4 font-semibold ${
                        item.approval === "approved"
                          ? "text-green-700"
                          : "text-red-700"
                      }`}
                    >
                      {item.approval}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-6 py-4 text-center border-b" colSpan="6">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-2 mt-4 mb-3">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded bg-indigo-600 text-white"
        >
          Prev
        </button>
        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded bg-indigo-600 text-white"
        >
          Next
        </button>
      </div>
    </>
  );
}

export default ReadPost;

// Modal Box Function

const ModalBox = ({ isOpen, onClose, postCount,limit }) => {
  if (!isOpen) return null;


  const result = limit - postCount;

  return (
    <>
      <div className="absolute top-full mt-2 right-0 w-64 md:w-[25vw] bg-blue-200 shadow-lg rounded-lg p-4 z-50 text-black">
        <div className="flex items-start border-b border-gray-300 pb-2">
          <div className="flex-1">
            <h3 className=" text-lg font-bold">Posts Preview</h3>
            <p className=" text-sm mt-1">Provides a summary of your Post.</p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 ml-2 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500"
            viewBox="0 0 320.591 320.591"
            onClick={onClose}
          >
            <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"></path>
            <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"></path>
          </svg>
        </div>

        <div className="my-4">
          <ul className="text-gray-800 space-y-2 text-base">
            <li className="flex justify-between">
              <span className="font-bold"> Limit </span>{" "}
              <span>Post: {limit}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-bold"> PostCount </span>{" "}
              <span className="">Post: {postCount}</span>
            </li>
            <li className="flex justify-between border-black border-t-[1px]">
              <span className="font-bold"> Remaining </span>
              <span>{result}</span>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-2 mt-4">
          {/* <button
            type="button"
            className="text-xs px-3 py-2 w-full bg-transparent hover:bg-gray-50 text-gray-800 border border-gray-300 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button> */}
          {/* <button
            type="button"
            className="text-xs px-3 py-2 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Pay
          </button> */}
        </div>
      </div>
    </>
  );
};
