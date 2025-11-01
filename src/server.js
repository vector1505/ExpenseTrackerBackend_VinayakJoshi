import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

import authRoutes from "./routes/auth.js"
import expenseRoutes from "./routes/expenses.js"
import { errorHandler } from "./middleware/errorHandler.js"
import reportRoutes from "./routes/reports.js"


dotenv.config()

const app = express();

// basic middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGODB_URI;


// Connecting to mongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

    app.get('/check', (req, res) => {
        res.status(200).send({ message: "works" });
    });     
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
}); 

// Using Routes in the App

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes)
app.use("/api/reports", reportRoutes)

app.use(errorHandler)

