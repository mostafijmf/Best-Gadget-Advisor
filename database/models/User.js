const mongoose = require("mongoose");
const validator = require('validator');

// Schema Design
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your valid name!"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email address is required!"],
        validate: [validator.isEmail, "Provide a valid email address!"],
        trim: true,
        unique: [true, "This email already exists!"],
    },
    password: {
        type: String,
        required: [true, "Please provide a valid password!"],
        validate: {
            validator: (value) =>
                validator.isStrongPassword(value, {
                    minLength: 8,
                    minNumber: 1,
                    minUppercase: 1,
                    minSymbols: 1,
                }),
            message: "Password {VALUE} is not enough strong!",
        },
    },
    role: {
        type: String,
        enum: ['sub-admin', 'admin'],
        default: 'admin'
    },
}, {
    timestamps: true,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;