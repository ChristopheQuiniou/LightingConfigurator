import express from "express"
import dotenv from "dotenv"
import cors from "cors";
import connectDB from "./config/database.js";
import errorHandler from "./middlewares/error-handler.js";
import handler404 from "./middlewares/404.js";
import productRouter from "./routes/products-router.js";

dotenv.config({path:"./.env"});

connectDB();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

//Routes
app.use("/api/v1/product",productRouter);

app.use(errorHandler);
app.use(handler404);

const startServer = async () => {
    try {
        app.on("error",(error) => {
            console.log("App error : ",error);
            throw error;
        });

        app.listen(PORT,() => {
            console.log(`Server running on ${PORT} => http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log("startServer catch : ", error);
    }
}
startServer();
