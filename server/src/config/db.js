import mongoose from "mongoose";

let connectDB = async () => {
    try {
        await mongoose.connect()
    } catch (error) {
        console.log("error while connecting to db");
    }
}

export default connectDB;