import mongoose from "mongoose";
import colors from "colors";

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(
            `mongoDB connected: ${conn.connection.host} and database port is ${conn.connection.port}`
                .white.bold.underline
        );
    } catch (err) {
        console.log("MONGO DATABASE ERROR:", err);
        process.exit();
    }
};

export default connectDb;