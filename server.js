import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import movieRoutes from "./routes/movieRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Movie API server is running"
    });
});

app.use("/api/v1/movie", movieRoutes);

const startserver = async () => {
    try {
        await connectDB();
        const PORT = process.env.PORT || 9000;
        // Fixed: Changed single quotes to backticks (``) so ${PORT} works
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

// CRITICAL FIX: You must call the function to execute it!
startserver();
