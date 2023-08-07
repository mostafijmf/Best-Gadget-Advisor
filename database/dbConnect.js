const mongoose = require("mongoose");

// database connection
export async function dbConnect() {
    await mongoose.connect(process.env.DB_LOCAL_URL)
        .then(() => {
            console.log('Database is connected.');
        })
        .catch((error) => {
            console.log(error);
        })
};