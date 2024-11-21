// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import TextInput from "../../../Components/TextInput";
// import axiosInstance from "../../../Utils/axiosInstance";
// import Navbar from "../../../Components/Navbar";

// function Update() {
//   const { id } = useParams();
//   const getUpdateUrl = `${import.meta.env.VITE_UPDATE_GET_URL}/${id}`;
//   const putUpdateUrl = `${import.meta.env.VITE_UPDATE_PUT_URL}/${id}`;
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     image: null, // Start with null for image
//     url_name: "",
//     url: "",
//   });
//   const navigate = useNavigate();

//   // Fetch existing data to populate the form
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axiosInstance.get(getUpdateUrl);
//         const { title, description, url_name, url } = response.data.data; // Adjusting here
//         setFormData({
//           title,
//           description,
//           url_name,
//           url,
//           image: null, // Image won't be populated in form
//         });
//       } catch (error) {
//         console.log("Error in fetching data:", error);
//       }
//     };
//     fetchData();
//   }, [getUpdateUrl]);

//   // Handle input change
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Handle file input change for image
//   const handleFileChange = (e) => {
//     setFormData({
//       ...formData,
//       image: e.target.files[0], // Store the file object
//     });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const updatedData = new FormData();
//     updatedData.append("title", formData.title);
//     updatedData.append("description", formData.description);
//     updatedData.append("url_name", formData.url_name);
//     updatedData.append("url", formData.url);

//     // Append the image only if it's selected
//     if (formData.image) {
//       updatedData.append("image", formData.image);
//     }

//     try {
//       await axiosInstance.put(putUpdateUrl, updatedData, {
//         // Use put instead of post
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       navigate("/"); // Redirect on successful update
//     } catch (error) {
//       console.log("Error in updating:", error);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="container mx-auto mt-12">
//         <div className="flex justify-center">
//           <div className="w-full max-w-lg">
//             <div className="bg-white shadow-lg rounded-lg p-6">
//               <h4 className="text-lg font-semibold mb-4 text-center">
//                 Update Backlink
//               </h4>
//               <form onSubmit={handleSubmit} encType="multipart/form-data">
//                 <div className="mb-4">
//                   <label
//                     htmlFor="title"
//                     className="block text-gray-700 text-sm font-medium mb-2"
//                   >
//                     Title
//                   </label>
//                   <TextInput
//                     inputType="text"
//                     name="title"
//                     inputValue={formData.title}
//                     onChange={handleChange}
//                     placeHolder="Enter the title"
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label
//                     htmlFor="description"
//                     className="block text-gray-700 text-sm font-medium mb-2"
//                   >
//                     Description
//                   </label>
//                   <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
//                     placeholder="Enter the description"
//                   ></textarea>
//                 </div>

//                 <div className="mb-4">
//                   <label
//                     htmlFor="image"
//                     className="block text-gray-700 text-sm font-medium mb-2"
//                   >
//                     Image
//                   </label>
//                   <input
//                     type="file"
//                     name="image"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                     className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label
//                     htmlFor="url_name"
//                     className="block text-gray-700 text-sm font-medium mb-2"
//                   >
//                     URL Name
//                   </label>
//                   <TextInput
//                     inputType="text"
//                     name="url_name"
//                     inputValue={formData.url_name}
//                     onChange={handleChange}
//                     placeHolder="Enter the URL name"
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label
//                     htmlFor="url"
//                     className="block text-gray-700 text-sm font-medium mb-2"
//                   >
//                     URL
//                   </label>
//                   <TextInput
//                     inputType="url"
//                     name="url"
//                     inputValue={formData.url}
//                     onChange={handleChange}
//                     placeHolder="Enter the URL"
//                   />
//                 </div>

//                 <div className="flex justify-center items-center transition-all duration-300 mt-4 bg-gradient-to-r from-indigo-500 to-blue-500 hover:scale-y-110 px-4 py-2 rounded-lg text-white">
//                   <button type="submit">Update Data</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Update;
