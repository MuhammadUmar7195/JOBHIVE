import express from "express";
import cookie from "cookie-parser";
import env from "dotenv";
import cors from "cors";
import connect from "./Utils/connect.js";
const app = express();
env.config();


//third-party middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());
const corOption = {
    origin: "#",
    credentials: true
}
app.use(cors(corOption));

//environment variable
const port = process.env.PORT || 5000;
const database = process.env.DB_URL;

const start = async () => {
    try {
        app.listen(port, () => {
            console.log(`Server is running on ${port}`);
        });
        await connect(database);
    } catch (error) {
        console.log(`Server & DB error occurs ${error}`);
    }
}

start();

//custom routes api 
import userRoutes from "./Routes/user.route.js";
app.use("/api/v1/user", userRoutes);

//test route
app.get("/", (req, res) => {
    res.send(`<center>Server is running on port ${port}</center>`);
});