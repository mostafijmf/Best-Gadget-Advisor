const mongoose = require("mongoose");

// database connection
export async function dbConnect() {
    await mongoose.connect(process.env.NEXT_PUBLIC_DB_LOCAL_URL)
        .then(() => {
            console.log('Database is connected.');
        })
        .catch((error) => {
            console.log(error);
        })
};