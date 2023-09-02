const mongoose = require("mongoose")
const moment = require("moment")
const enquirySchema = new mongoose.Schema({
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
    courseInterest: { type: String, required: true },
    isClaimed: { type: Boolean, default: false },
    claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    created_at: { type: String, default: moment().format("DD-MM-YYYY hh:mm:ss") },
    updated_at: { type: String, default: moment().format("DD-MM-YYYY hh:mm:ss") }
});

const enquiry = new mongoose.model('ENQUIRY', enquirySchema);
module.exports = enquiry;