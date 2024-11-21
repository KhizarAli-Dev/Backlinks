import * as Yup from "yup";

export const LoginSchema = Yup.object({
  email: Yup.string().email("Invalid Email").required("Email Is Required"),
  password: Yup.string()
    .min(8, "Minimum 8 Characters")
    .max(12, "Maximum 12 Characters")
    .required("Password Is Required"),
});
