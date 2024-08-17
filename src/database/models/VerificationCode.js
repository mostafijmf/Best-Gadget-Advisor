const mongoose = require("mongoose");
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;

// Schema Design
const vCodeSchema = new mongoose.Schema({
    code: {
        type: Number,
    },
    expirationTime: {
        type: Date,
    },
    email: {
        type: String,
        validate: [validator.isEmail, "Provide a valid email address!"],
        trim: true,
    },
    user: {
        type: ObjectId,
        ref: 'users',
    }
}, {
    timestamps: true,
});

const VerificationCode = mongoose.models.verification_codes || mongoose.model("verification_codes", vCodeSchema);

export default VerificationCode;
