import express from "express"
import dotenv from "dotenv"
import cors from "cors";

dotenv.config({path:"./.env"})
const PORT = dotenv.PORT || 3000;
const app = express();

app.use(cors);
app.use(express.json());

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

app.get("/",(request,response) => {
    response.sendFile()
});

startServer();