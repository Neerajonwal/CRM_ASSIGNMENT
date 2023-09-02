const mongoose = require('mongoose');

const moment = require("moment")
const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        max_length: 35,
    },
    email: {
        type: String,
        required: true,
        loadClass: true,
        unique: [true, "email Id Already Exist"],
        validator(value) {
            if (validator.isMail(value)) {
                throw new Error("invalid Email")
            }
        }
    },
    password: { type: String, required: true },
    created_at: { type: String, default: moment().format("DD-MM-YYYY hh:mm:ss") },
    updated_at: { type: String, default: moment().format("DD-MM-YYYY hh:mm:ss") }
});


const employee = new mongoose.model('EMPLOYEE', employeeSchema);
module.exports = employee;