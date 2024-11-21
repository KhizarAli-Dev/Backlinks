import * as Yup from "yup";

export const FormSchema = Yup.object({
  title: Yup.string()
    .required("Title is Required"),
  description: Yup.string()
    .max(1000, "Maximum 1000 Characters")
    .required("Description is Required"),
  image: Yup.mixed()
    .required("Image is Required")
    .test("fileSize", "File size is too large", (value) => {
      return value && value.size <= 1024 * 1024; // 1MB limit
    })
    .test("fileType", "Unsupported file format", (value) => {
      return value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
    }),
  url_name: Yup.string().required("URL Name is Required"),
  url: Yup.string().url("Invalid URL").required("URL is Required"),
});
