import mongoose from "mongoose";

const connection: any = {};
const connectDb = async () => {
    try {
        if (connection.isConnected) return;
        const db = await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ymnt0q4.mongodb.net/newdatabase?retryWrites=true&w=majority`);
        connection.isConnected = db.connections[0].readyState;
        console.log("Database is connected")
    } catch (err: any) {
        console.error("Error connecting to database:", err);
        return new Error(err);
    }
};

export default connectDb;
