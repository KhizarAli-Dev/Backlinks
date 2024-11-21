import React from "react";
import Navbar from "../../../Components/Navbar";
import SignUpInput from "../../../Components/SignUpInput";
import { useFormik } from "formik";
import { SignUpSchema } from "../../../Formik/SignUpSchema";
import SignUpButton from "../../../Components/SignUpButton";
import SignUpImage from "../../../assets/signup.jpg";
import axiosInstance from "../../../Utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function AddUser() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      limit: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axiosInstance.post(
          import.meta.env.VITE_INSERT_USER,
          values
        );

        if (response.data.success) {
          console.log(response.data);
          navigate("/Users");
          resetForm();
        } else {
          console.log(response.data);
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "An unexpected error occurred.";
        toast.error(errorMessage, {
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
    <>
      <Navbar />
      <div className="font-[sans-serif] transition-all ease-in-out duration-500 mt-20 sm:mt-16">
        <div className="min-h-screen flex flex-col items-center justify-center p-6 transition-all ease-in-out duration-500 ">
          <div className="grid lg:grid-cols-2 gap-6 max-w-7xl max-lg:max-w-xl w-full transition-all ease-in-out duration-500 border-amber-950-500 border-2 bg-[#7F7FD5] rounded-xl">
            <div className="flex items-center justify-center py-8">
              <form
                className="lg:w-[80%] md:w-[70%] w-[65%] transition-all ease-in-out duration-500"
                onSubmit={formik.handleSubmit}
              >
                <h3 className="text-white text-2xl font-bold mb-12">
                  Add New User
                </h3>
                <div className="space-y-6 ">
                  <div>
                    <label className="text-white text-base mb-2 block">
                      Name
                    </label>
                    <SignUpInput
                      signUpType="text"
                      signUpPlaceHolder="Name"
                      signUpValue={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      signUpName="name"
                    />
                    {formik.errors.name && formik.touched.name ? (
                      <p className="text-red-700 text-sm mt-1">
                        {formik.errors.name}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label className="text-white  text-sm mb-2 block">
                      Email
                    </label>
                    <SignUpInput
                      signUpType="email"
                      signUpPlaceHolder="Email"
                      signUpValue={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      signUpName="email"
                    />
                    {formik.errors.email && formik.touched.email ? (
                      <p className="text-red-700 text-sm mt-1">
                        {formik.errors.email}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label className="text-white  text-sm mb-2 block">
                      Password
                    </label>
                    <SignUpInput
                      signUpType="password"
                      signUpPlaceHolder="Password"
                      signUpValue={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      signUpName="password"
                    />
                    {formik.errors.password && formik.touched.password ? (
                      <p className="text-red-700 text-sm mt-1">
                        {formik.errors.password}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label className="text-white  text-sm mb-2 block">
                      Limit
                    </label>
                    <SignUpInput
                      signUpType="number"
                      signUpPlaceHolder="Limit"
                      signUpValue={formik.values.limit}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      signUpName="limit"
                    />
                    {formik.errors.limit && formik.touched.limit ? (
                      <p className="text-red-700 text-sm mt-1">
                        {formik.errors.limit}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <SignUpButton signUpButtonType="submit" />
                  </div>
                </div>
              </form>
            </div>

            <div className="hidden md:block h-full max-lg:mt-12 transition-all ease-in-out duration-500">
              <img
                src={SignUpImage}
                className="w-full h-full object-cover rounded-xl shadow-lg"
                alt="Sign Up Image"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddUser;
