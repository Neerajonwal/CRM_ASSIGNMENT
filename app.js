const express = require('express');
const config = require("./config/config");
const cookieParser = require("cookie-parser");
const app = express();

// Require and establish the database connection
require("./db/connection");

// Define the port from the configuration
const PORT = config.PORT;

// Require the API router
const Api_Router = require("./router/api_router");

// Use cookie-parser middleware to parse cookies
app.use(cookieParser());

// Parse JSON request bodies
app.use(express.json());

// Route API requests through the "api" base path
app.use("/api", Api_Router);

// Start the server and listen on the defined port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
