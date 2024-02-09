import mongoose from "mongoose";
const connectDb = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ymnt0q4.mongodb.net/");
        console.log("Database is connected`);
    } catch (err) {
        console.error("Error connecting to database:", err);
    }
};

export default connectDb;
