import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../Utils/axiosInstance";
import Navbar from "../../../Components/Navbar";
import { FiEdit } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AllPost() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(12);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [postLength, setPostLength] = useState(0);
  const [approvalFilter, setApprovalFilter] = useState("");

  useEffect(() => {
    fetchData();
    usersFetch();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(import.meta.env.VITE_FETCH_URL);
      setData(response.data.data.posts);
    } catch (error) {
      console.log("Error in data", error);
    }
  };

  const usersFetch = async () => {
    try {
      const res = await axiosInstance.get(import.meta.env.VITE_FETCH_USER);
      setUsers(res.data.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesUser =
        selectedUser === "" || item.user.name === selectedUser;
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesApproval =
        approvalFilter === "" || item.approval === approvalFilter; // Check approval status

      return matchesUser && matchesSearch && matchesApproval;
    });
  }, [data, searchTerm, selectedUser, approvalFilter]);

  useEffect(() => {
    setPostLength(filteredData.length);
  }, [filteredData]);

  // Calculate the paginated data
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

  const postDelete = async (id) => {
    try {
      await axiosInstance.delete(`${import.meta.env.VITE_DELEET_URL}/${id}`);
      setData(data.filter((item) => item._id !== id));
      toast.error("Post deleted successfully!", {
        position: "top-right",
        autoClose: 1000,
      });
      fetchData()
    } catch (error) {
      console.log("Error deleting the item:", error);
    }
  };

  const approval = async (id) => {
    try {
      await axiosInstance.put(`${import.meta.env.VITE_APPROVAL_URL}/${id}`);
      fetchData(); // Reload posts data after approval
    } catch (error) {
      console.log(error);
    }
  };

  const unapproval = async (id) => {
    try {
      await axiosInstance.put(`${import.meta.env.VITE_UNAPPROVAL_URL}/${id}`);
      fetchData(); // Reload posts data after unapproval
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <Navbar />

      <div className="flex items-center justify-center flex-col mt-20">
        <div className="w-[95vw] h-[85vh] relative overflow-x-auto shadow-lg rounded-xl">
          <div className=" flex flex-col sm:flex-row items-center justify-between py-3 px-4 sm:px-8 bg-gradient-to-r from-slate-900 to-slate-700 w-full space-y-3 sm:space-y-0">
            <input
              className="outline-none rounded-lg py-2 px-3 w-full sm:w-[25%] text-sm md:text-base"
              type="text"
              placeholder="Search Posts"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <h1 className=" text-white font-semibold text-2xl uppercase">
              Posts : {postLength > 0 ? postLength : "No Data"}
            </h1>

            <div>
              <select
                value={recordsPerPage}
                onChange={handleRecordsPerPageChange}
                className="bg-white border border-gray-300 rounded-lg py-2 px-3 text-sm md:text-base ml-2 mb-1"
              >
                <option selected value={12}>
                  Records
                </option>

                <option value={20}>20 Records</option>
                <option value={30}>30 Records</option>
                <option value={50}>50 Records</option>
              </select>
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg py-2 px-3 text-sm md:text-base ml-2  mb-1"
              >
                <option value="">All Users</option>
                {users.map((user) => (
                  <option key={user._id} value={user.name}>
                    {user.name}
                  </option>
                ))}
              </select>

              <select
                value={approvalFilter}
                onChange={(e) => setApprovalFilter(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg py-2 px-3 text-sm md:text-base ml-2"
              >
                <option value=""> Approval Status </option>
                <option value="approved">Approved</option>
                <option value="unapproved">Unapproved</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-center text-gray-500">
              <thead className="text-xs text-white uppercase bg-gradient-to-r from-blue-600 to-indigo-700 h-12">
                <tr>
                  <th className="px-3 sm:px-6 py-3">S : No</th>
                  <th className="px-3 sm:px-6 py-3">Title</th>
                  <th className="px-3 sm:px-6 py-3">Description</th>
                  <th className="px-3 sm:px-6 py-3">Image</th>
                  <th className="px-3 sm:px-6 py-3">URL</th>
                  <th className="px-3 sm:px-6 py-3">User</th>
                  <th className="px-3 sm:px-6 py-3">Approval</th>
                  <th className="px-3 sm:px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentData.length > 0 ? (
                  currentData.map((item, index) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-50 transition-all ease-in-out hover:-translate-y-2 hover:text-white hover:bg-gradient-to-r from-cyan-400 to-blue-400 duration-300"
                    >
                       <td className="px-3 sm:px-6 py-4 text-gray-900 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-3 sm:px-6 py-4 text-gray-900 whitespace-nowrap">
                        {item.title}
                      </td>
                      <td className="px-3 sm:px-6 py-4">{item.description}</td>
                      <td className="px-3 sm:px-6 py-4">
                        <img src={item.image} alt="img" className="w-12 h-12" />
                      </td>
                      <td className="px-3 sm:px-6 py-4">
                        <a
                          href={item.url}
                          target="_blank"
                          className="text-blue-600 hover:underline"
                        >
                          {item.url_name}
                        </a>
                      </td>
                      <td className="px-3 sm:px-6 py-4">{item.user.name}</td>
                      <td
                        className={`px-3 sm:px-6 py-4 font-semibold ${
                          item.approval === "approved"
                            ? "text-green-700"
                            : "text-red-700"
                        }`}
                      >
                        {item.approval}
                      </td>
                      <td className="px-3 sm:px-6 py-4 flex space-x-1">
                        {item.approval === "unapproved" ? (
                          <button
                            onClick={() => approval(item._id)}
                            className="bg-green-500 text-white px-2 rounded-lg"
                          >
                            Approve
                          </button>
                        ) : (
                          <button
                            onClick={() => unapproval(item._id)}
                            className="bg-red-500 text-white px-2 rounded-lg"
                          >
                            Unapprove
                          </button>
                        )}
                        <Link to={`/UpdatePost/${item._id}`}>
                          <button className="bg-green-500 text-white  py-1 px-2 rounded-lg">
                            <FiEdit />
                          </button>
                        </Link>
                        <button
                          onClick={() => postDelete(item._id)}
                          className="bg-red-500 text-white px-2 rounded-lg"
                        >
                          <HiOutlineTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-6 py-4 text-center" colSpan="6">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

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

export default AllPost;
