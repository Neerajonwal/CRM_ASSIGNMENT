const config = require("../config/config");
const employee = require("../model/Employe_Schema");
const Enquiry = require("../model/enquiry_Schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Employee Registration
const Employee_register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the email already exists
        const existingEmployee = await employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password before saving it
        const Passwordhash = await bcrypt.hash(password, 10);

        // Create a new employee
        const newEmployee = new employee({ name, email, password: Passwordhash });
        await newEmployee.save();

        return res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Employee Login
const Employee_login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the employee exists
        const Employee = await employee.findOne({ email });

        if (!Employee) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, Employee.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ _id: Employee._id, email: Employee.email }, config.JWT_SECRET);
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Public Enquiry Form Submission
const public_from = async (req, res) => {
    try {
        const { name, email, courseInterest } = req.body;

        // Create a new enquiry
        const newEnquiry = new Enquiry({ name, email, courseInterest });
        await newEnquiry.save();

        res.status(201).json({ message: 'Enquiry submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// API to Claim an Enquiry
const Claim_Enquiry = async (req, res) => {
    try {
        const { enquiryId } = req.params;

        // Find the enquiry by ID
        const enquiry = await Enquiry.findById(enquiryId);

        if (!enquiry) {
            return res.status(404).json({ message: 'Enquiry not found' });
        }

        // Check if the enquiry is already claimed
        if (enquiry.claimedBy) {
            return res.status(400).json({ message: 'Enquiry already claimed' });
        }

        // Assign the enquiry to the logged-in employee
        enquiry.claimedBy = req.employee._id;
        await enquiry.save();

        res.status(200).json({ message: 'Enquiry claimed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// API to Fetch Unclaimed Enquiries
const Unclaim_Enquiry = async (req, res) => {
    try {
        // Find all enquiries that are not claimed
        const unclaimedEnquiries = await Enquiry.find({ claimedBy: null });

        res.status(200).json(unclaimedEnquiries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// API to Fetch Enquiries Claimed by the Logged-In Employee
const Claimed_Enquiry_by_loggedin_emp = async (req, res) => {
    try {
        // Find all enquiries claimed by the logged-in employee
        const myClaimedEnquiries = await Enquiry.find({ claimedBy: req.employee.id });

        res.status(200).json(myClaimedEnquiries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { Employee_register, Employee_login, public_from, Claim_Enquiry, Unclaim_Enquiry, Claimed_Enquiry_by_loggedin_emp };
