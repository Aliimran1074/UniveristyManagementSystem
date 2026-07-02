const mongoose = require('mongoose')

const staffAttendanceSchema = new mongoose.Schema({
    staffId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "staffModel",
        required: true
    },
    status: {
        type: String,
        enum: ["present", "absent", "leave"],
        default: "present"
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

const staffAttendenceModel = mongoose.model("staffAttendanceModel", staffAttendanceSchema) 
module.exports = staffAttendenceModel