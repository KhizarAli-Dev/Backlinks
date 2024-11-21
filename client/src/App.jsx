import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Login from "./Auth/Login/Login";
import AllUsers from "./Pages/Admin/Users/AllUsers";
import AllPost from "./Pages/Admin/Posts/AllPost";
import AddUser from "./Pages/Admin/Users/AddUser";
import InsertPost from "./Pages/User/Dashboard/InsertPost";
import ReadPost from "./Pages/User/Dashboard/ReadPost";
import UpdatePost from "./Pages/Admin/Posts/UpdatePost";
import { setRole } from "./store/actions";
import UpdateUser from "./Pages/Admin/Users/UpdateUsers";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.role.role);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole && !role) {
      const parsedRole = parseInt(storedRole);
      dispatch(setRole(parsedRole));
    }
  }, [dispatch, role]);

  return (
  <>
  <ToastContainer/>
    <Routes>
      {/* Conditional Rendering Based on Role */}
      {role === 1 ? (
        // Admin Routes
        <>
          <Route path="/Users" element={<AllUsers />} />
          <Route path="/AddUser" element={<AddUser />} />
          <Route path="/Posts" element={<AllPost />} />
          <Route path="/UpdatePost/:id" element={<UpdatePost />} />
          <Route path="/UpdateUser/:id" element={<UpdateUser />} />
          {/* Redirect to admin's default page if the role is 1 */}
          <Route path="*" element={<Navigate to="/Users" />} />
        </>
      ) : role === 0 ? (
        // User Routes
        <>
          <Route path="/AddPost" element={<InsertPost />} />
          <Route path="/ViewPosts" element={<ReadPost />} />
          {/* Redirect to user's default page if the role is 0 */}
          <Route path="*" element={<Navigate to="/ViewPosts" />} />
          
        </>
      ) : (
        // No role found or invalid role, redirect to Login
        <>
          <Route path="/Login" element={<Login />} />
          <Route path="*" element={<Navigate to="/Login" />} />
        </>
      )}
    </Routes>
    </>
  );
}

export default App;
