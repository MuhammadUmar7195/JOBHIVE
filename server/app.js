import express from "express";
import cookie from "cookie-parser";
import env from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connect from "./Utils/connect.js";
const app = express();
env.config();


//third-party middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());
const corOption = {
    origin: "http://localhost:3000",
    credentials: true
}
app.use(cors(corOption));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "dist")));

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
import companyRoutes from "./Routes/company.route.js";
import jobRoute from "./Routes/job.route.js";
import applicationRoute from "./Routes/application.route.js";

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

//test route
app.get("/", (req, res) => {
    res.send(`<center>Server is running on port ${port}</center>`);
});