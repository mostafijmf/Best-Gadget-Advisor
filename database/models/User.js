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
        default: 'sub-admin',
        required: [true, "Please provide user role!"],
        validate: {
            validator: function (value) {
                if (value === 'admin') {
                    return this.constructor.findOne({ role: 'admin' })
                        .then(user => !user)
                        .catch(() => false);
                }
                return true;
            },
            message: "Only one 'admin' role is allowed!",
        },
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'active', 'block'],
        default: 'pending',
    }
}, {
    timestamps: true,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;