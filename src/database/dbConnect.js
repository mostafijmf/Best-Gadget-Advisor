import mongoose from "mongoose";

// database connection
export const dbConnect = async () => {
    await mongoose.connect(process.env.NEXT_PUBLIC_DB_URL)
        .then(() => {
            console.log(`Database is connected`);
        })
        .catch((error) => {
            console.error(error);
        });
};
