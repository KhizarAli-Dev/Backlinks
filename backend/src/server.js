import mongoose from "mongoose";
import app from "./app.js";
import dotenv from "dotenv";
// import cors from "cors";

dotenv.config({ path: "./config.env" }); // Adjust path based on file location

// app.use(
//   cors({
//     origin: "*",
//     credentials: true,
//   })
// );

// Connect to MongoDB
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Mongodb Connection Fail " + err));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
