const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require('validator');

// <== Schema Design ==>
const leaveAReplySchema = new mongoose.Schema({
    comment: {
        type: String,
        required: [true, "Comment is required!"],
        trim: true,
    },
    name: {
        type: String,
        required: [true, "Please provide your name"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email address is required!"],
        validate: [validator.isEmail, "Provide a valid email address!"],
        trim: true,
    },
    website: {
        type: String,
        trim: true,
    },
    blogId: {
        type: ObjectId,
        ref: "Blog",
    },
    status: {
        type: String,
        enum: ['approve', 'pending'],
        default: 'pending',
    }
}, {
    timestamps: true,
});


const LeaveAReply = mongoose.models.leave_a_replies || mongoose.model("leave_a_replies", leaveAReplySchema);

export default LeaveAReply;