import React from "react";
import LoginImg from "../../assets/login.jpg";
import LoginInput from "../../Components/LoginInput";
import LoginButton from "../../Components/LoginButton";
import { useFormik } from "formik";
import { LoginSchema } from "../../Formik/LoginSchema";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Utils/axiosInstance";
import { useDispatch } from "react-redux";
import { setRole } from "../../store/actions"; // Ensure correct import
import { toast } from "react-toastify";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.post(
          import.meta.env.VITE_LOGIN_API,
          values
        );
        if (response.data.success) {
          const userRole = response.data.data.user.role;
          dispatch(setRole(userRole));
          localStorage.setItem("role", userRole);
          localStorage.setItem("token", response.data.data.token);

          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          // navigate("/Users");
        } else {
          console.log("Login error");
        }
      } catch (error) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    },
  });

  return (
    <div className="transition-all ease-in-out duration-500 flex items-center justify-center bg-gradient-to-r from-cyan-200 to-cyan-500 w-[100vw] h-[100vh] p-8">
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col items-center justify-center rounded-lg shadow-2xl p-8 lg:w-[35%] h-auto lg:h-[70vh]">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Login
        </h1>
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div className="lg:w-[25vw]">
            <LoginInput
              loginType="email"
              loginPlaceHolder="Email"
              loginName="email"
              loginValue={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full"
            />
            {formik.errors.email && formik.touched.email ? (
              <p className="text-red-700 text-sm mt-1">{formik.errors.email}</p>
            ) : null}
          </div>
          <div className="lg:w-[25vw]">
            <LoginInput
              loginType="password"
              loginPlaceHolder="Password"
              loginName="password"
              loginValue={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full"
            />
            {formik.errors.password && formik.touched.password ? (
              <p className="text-red-700 text-sm mt-1">
                {formik.errors.password}
              </p>
            ) : null}
          </div>
          <LoginButton buttonType="submit" />
        </form>
      </div>

      <div className="hidden md:block md:w-[35%] lg:w-[35%] md:ml-8">
        <img
          src={LoginImg}
          alt="Login"
          className="object-cover rounded-3xl shadow-lg"
        />
      </div>
    </div>
  );
}

export default Login;
