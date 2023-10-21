// Load environment variables from a .env file in development
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Import required libraries
const express = require("express");
const app = express();
const scheduleRoutes = require("./routes/scheduleRoutes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors=require('cors')

// Define the database URL using an environment variable or a default value
const db_Url = process.env.DB_URL || "mongodb://localhost:27017/InternProject";

// Connect to the MongoDB database
mongoose
  .connect(db_Url)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("err");
  });
  const corsOptions = {
    origin: ["http://localhost:3000","https://live-demo-woad.vercel.app"], // Replace with your frontend URL
  };
  
  app.use(cors(corsOptions));
// Use Express middlewares
app.use(express.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Seed the schedule data (presumably for development/testing purposes)
const seedSchedule = require("./seed");
seedSchedule();

// Define and use the schedule routes
app.use(scheduleRoutes);

// Define the server port using an environment variable or a default value
const port = process.env.PORT || 5000;

// Start the Express server
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
