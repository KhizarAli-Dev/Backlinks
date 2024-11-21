import React from "react";
import TextInput from "../../../Components/TextInput";
import { useFormik } from "formik";
import { FormSchema } from "../../../Formik/FormSchema";
import axiosInstance from "../../../Utils/axiosInstance";
import Navbar from "../../../Components/Navbar";
import { toast, ToastContainer } from "react-toastify";
import UserNavbar from "../../../Components/UserNavbar";
import { useNavigate } from "react-router-dom";

function InsertPost() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      image: null, // Start with null for image
      url_name: "",
      url: "",
    },
    validationSchema: FormSchema,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);

      // Ensure that the image file is appended correctly
      if (values.image) {
        formData.append("image", values.image);
      }

      formData.append("url_name", values.url_name);
      formData.append("url", values.url);

      try {
        const response = await axiosInstance.post(
          import.meta.env.VITE_INSERT_URL,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Ensure multipart content type
            },
          }
        );
        // Successful response handling
        toast.success("Post Added Successfully", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        resetForm(); // Clear the form after successful submission
        navigate("/ViewPosts");
      } catch (error) {
        console.error("Error:", error);

        // Check for error response
        if (error.response) {
          // General error handling
          if (error.response.data && error.response.data.statusCode === 403) {
            toast.error(error.response.data.message, {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            // Handle other error responses
            toast.error(
              "An error occurred: " +
                (error.response.data.message || "Please try again."),
              {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
          }
        } else {
          // Handle network errors or other unexpected errors
          toast.error("Network error. Please check your connection.", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    },
  });

  return (
    <>
      <ToastContainer />
      <UserNavbar />
      <div className="container mx-auto mt-12">
        <div className="flex justify-center">
          <div className="w-full max-w-lg">
            <div className="bg-white shadow-lg rounded-lg">
              <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-center py-4 rounded-t-lg">
                <h4 className="text-lg font-semibold">Add Backlinks</h4>
              </div>
              <div className="p-6">
                <form
                  onSubmit={formik.handleSubmit}
                  encType="multipart/form-data "
                >
                  <div className="mb-4">
                    <label
                      htmlFor="title"
                      className="block text-gray-700 text-sm font-medium mb-2"
                    >
                      Title
                    </label>
                    <TextInput
                      inputType="text"
                      name="title"
                      inputValue={formik.values.title}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeHolder="Enter the title"
                    />
                    {formik.touched.title && formik.errors.title ? (
                      <div className="text-red-500 text-sm">
                        {formik.errors.title}
                      </div>
                    ) : null}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="description"
                      className="block text-gray-700 text-sm font-medium mb-2"
                    >
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                      placeholder="Enter the description"
                    ></textarea>
                    {formik.touched.description && formik.errors.description ? (
                      <div className="text-red-500 text-sm">
                        {formik.errors.description}
                      </div>
                    ) : null}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="image"
                      className="block text-gray-700 text-sm font-medium mb-2"
                    >
                      Image
                    </label>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={(event) => {
                        formik.setFieldValue("image", event.target.files[0]);
                      }}
                      onBlur={formik.handleBlur}
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                    />
                    {formik.touched.image && formik.errors.image ? (
                      <div className="text-red-500 text-sm">
                        {formik.errors.image}
                      </div>
                    ) : null}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="url_name"
                      className="block text-gray-700 text-sm font-medium mb-2"
                    >
                      URL Name
                    </label>
                    <TextInput
                      inputType="text"
                      name="url_name"
                      inputValue={formik.values.url_name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeHolder="Enter the URL name"
                    />
                    {formik.touched.url_name && formik.errors.url_name ? (
                      <div className="text-red-500 text-sm">
                        {formik.errors.url_name}
                      </div>
                    ) : null}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="url"
                      className="block text-gray-700 text-sm font-medium mb-2"
                    >
                      URL
                    </label>
                    <TextInput
                      inputType="url"
                      name="url"
                      inputValue={formik.values.url}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeHolder="Enter the URL"
                    />
                    {formik.touched.url && formik.errors.url ? (
                      <div className="text-red-500 text-sm">
                        {formik.errors.url}
                      </div>
                    ) : null}
                  </div>

                  {/* <div className="flex justify-center">
                      <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Add
                      </button>
                    </div> */}
                  <div className="flex justify-center items-center transition-all duration-300  mt-4 bg-gradient-to-r from-indigo-500 to-blue-500 hover:scale-y-110 px-4 py-2 rounded-lg text-white">
                    <button type="submit">Add Data</button>
                  </div>
                </form>
              </div>
            </div>
            {/* <div className="flex justify-center items-center transition-all duration-300  mt-4 bg-gradient-to-r from-indigo-500 to-blue-500 hover:scale-y-110 px-4 py-2 rounded-lg ">
              <button type="submit">
                <Link to="/" className="text-white">
                  Add Data
                </Link>
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default InsertPost;
