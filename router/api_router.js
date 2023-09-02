const express = require("express");
const authonticationToken = require("../middleware/authontication")
const Api_Router = express.Router();
const controller = require("../controller/controller");
const authenticateToken = require("../middleware/authontication");

// Employee Registration
Api_Router.post("/register", controller.Employee_register);
// URL: http://localhost:5009/api/register
// Body Example:
// {
//     "name": "neeraj",
//     "email": "hello@gmail.com",
//     "password": "hello123"
// }

// Employee Login
Api_Router.post("/login", controller.Employee_login);
// URL: http://localhost:5009/api/login
// Body Example:
// {
//     "email": "hell@gmail.com",
//     "password": "hello123"
// }

// Public Enquiry Form Submission
Api_Router.post("/public-form", controller.public_from);
// URL: http://localhost:5009/api/public-form
// Body Example:
// {
//   "name": "neeraj",
//   "email": "hell@gmail.com",
//   "courseInterest": "UPSC"
// }

// API to Claim an Enquiry
Api_Router.get("/claim-enquiry/:enquiryId", authenticateToken, controller.Claim_Enquiry);
// URL Example: http://localhost:5009/api/claim-enquiry/64f2de95ba3d5a37da9c7933
// In the "Headers" section, add an "Authorization" header with the JWT token obtained after logging in
// API to Fetch Unclaimed Enquiries
Api_Router.get("/unclaimed-enquiries", controller.Unclaim_Enquiry);
// URL: http://localhost:5009/api/unclaimed-enquiries

// API to Fetch Enquiries Claimed by the Logged-In Employee
Api_Router.get("/my-claimed-enquiries", authonticationToken, controller.Claimed_Enquiry_by_loggedin_emp);
// URL: http://localhost:5009/api/unclaimed-enquiries
// In the "Headers" section, add an "Authorization" header with the JWT token obtained after logging in

module.exports = Api_Router;
