import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import connectdb from "./db/database.js"; // Import MongoDB connection logic
import blogRoute from "./routes/blogsroute.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import jobRoutes from "./routes/jobRoutes.js";

// Load environment variables from .env file
import dotenv from "dotenv";
import UserRoute from "./routes/user.routes.js";
import { errorHandler } from "./middleware/globalErrorHandler.js";
import imgRouter from "./routes/ImageRoute.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import router from "./routes/blog/blogRoutes.js";
import SendOtpToPhNumberRouter from "./routes/SendOtpToPhNumber.js";
dotenv.config();

// Initialize Express app
const app = express();
app.use(morgan("dev"));

app.use(cookieParser());

// Middleware setup
app.use(
  cors({
    origin: ["https://strong-wisp-f6d2b7.netlify.app", "http://localhost:5173"], // example of multiple origins
    credentials: true,
  })
);

app.use(bodyParser.json());

// Establish MongoDB connection
connectdb();

// Routes
app.use("/api/blogs", router) // blogs
app.use("/api", blogRoute); // review table 
app.use("/api/sec",UserRoute);  //login, signup, logout
app.use("/api/crousal" , imgRouter); //hero image
app.use("/api/pdf", uploadRoutes);  //pdf upload
app.use("/api/jobs", jobRoutes); // job routes
app.use("/api/Otp", SendOtpToPhNumberRouter); // OTP routes
// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
