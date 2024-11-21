import * as Yup from "yup";

export const SignUpSchema = Yup.object({
  name: Yup.string()
    .min(3, "Minimum 3 Characters")
    .max(16, "Maximum 16 Characters")
    .required("Name Is Required"),
  email: Yup.string().email("Invalid Email").required("Email Is Required"),
  password: Yup.string()
    .min(8, "Minimun 8 Characters Password")
    .max(12, "Maximum 12 Characters Password")
    .required("Password Is Required"),
  limit: Yup.number().required("Limit Is Required"),
});
