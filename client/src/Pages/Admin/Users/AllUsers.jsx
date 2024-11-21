import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../../../Components/Navbar";
import axiosInstance from "../../../Utils/axiosInstance";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi2";

function AllUsers() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          import.meta.env.VITE_FETCH_USER
        );
        setData(response.data.data.users);
      } catch (error) {
        console.log("Error in data", error);
      }
    };
    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const userDelete = async (id) => {
    try {
      await axiosInstance.delete(`${import.meta.env.VITE_DELETE_USER}/${id}`);
      setData(data.filter((item) => item._id !== id));
    } catch (error) {
      console.log("Error deleting the user:", error);
    }
  };

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentData = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

  const handleRecordsPerPageChange = (e) => {
    setRecordsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center flex-col mt-20">
        <div className="w-[95vw] h-[85vh] relative overflow-x-auto shadow-lg rounded-xl">
          <div className=" flex flex-col sm:flex-row items-center justify-between py-3 px-4 sm:px-8 bg-gradient-to-r from-slate-900 to-slate-700 w-full space-y-3 sm:space-y-0">
            <input
              className="outline-none rounded-lg py-2 px-3 w-full sm:w-[50%] md:w-[30%] lg:w-[25%] text-sm md:text-base"
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <h1 className="hidden md:block text-white font-semibold text-lg md:text-2xl uppercase mt-2 sm:mt-0">
              Users
            </h1>

            <select
              value={recordsPerPage}
              onChange={handleRecordsPerPageChange}
              className="bg-white border border-gray-300 rounded-lg py-2 px-3 text-sm md:text-base mt-2 sm:mt-0"
            >
              <option value={5}>5 Records</option>
              <option value={10}>10 Records</option>
              <option value={20}>20 Records</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-center text-gray-500">
              <thead className="text-xs text-white uppercase bg-gradient-to-r from-blue-600 to-indigo-700 h-12">
                <tr>
                  <th className="px-3 sm:px-6 py-3">S : No</th>
                  <th className="px-3 sm:px-6 py-3">Name</th>
                  <th className="px-3 sm:px-6 py-3">Email</th>
                  <th className="px-3 sm:px-6 py-3">Password</th>
                  <th className="px-3 sm:px-6 py-3">Limit</th>
                  <th className="px-3 sm:px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentData.length > 0 ? (
                  currentData.map((item,index) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-50 transition-all ease-in-out hover:-translate-y-2 hover:text-white hover:bg-gradient-to-r from-cyan-400 to-blue-400 duration-300"
                    >
                      <td className="px-3 sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-3 sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {item.name}
                      </td>

                      <td className="px-3 sm:px-6 py-4">{item.email}</td>
                      <td className="px-3 sm:px-6 py-4">{item.password}</td>
                      <td className="px-3 sm:px-6 py-4">{item.limit}</td>
                      <td className="px-3 sm:px-6 py-4 flex justify-center gap-2">
                        <Link to={`/UpdateUser/${item._id}`}>
                          <button className="bg-green-500 text-white  py-1 px-2 rounded-lg">
                            <FiEdit />
                          </button>
                        </Link>
                        <button
                          onClick={() => userDelete(item._id)}
                          className="bg-red-500 text-white px-2 rounded-lg"
                        >
                          <HiOutlineTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
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
        </div>
      </div>
    </>
  );
}

export default AllUsers;
