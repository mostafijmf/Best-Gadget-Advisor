const mongoose = require("mongoose");

// <== Schema Design ==>
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a valid title!"],
        trim: true,
    },
    coverPhoto_src: {
        type: String,
        required: [true, "Image url is required!"],
        trim: true,
    },
    coverPhoto_alt: {
        type: String,
        required: [true, "Image alt is required!"],
        trim: true,
    },
    pathName: {
        type: String,
        trim: true,
        required: [true, "Blog path name is required!"],
        validate: {
            validator: async function (value) {
                const exist = await mongoose.models.blogs.findOne({ pathName: value });
                return !exist;
            },
            message: "`{VALUE}` should be unique!",
        },
    },
    metaDescription: {
        type: String,
        required: [true, "Meta Description is required!"],
        maxLength: 155,
    },
    content: {
        type: String,
        required: [true, "Blog content is required!"],
    },
    views: {
        type: Number,
        default: 0, // Initialize view count to zero
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    }
}, {
    timestamps: true,
});


const Blog = mongoose.models.blogs || mongoose.model("blogs", blogSchema);

export default Blog;