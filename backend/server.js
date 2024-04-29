import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json()); //to parse the imcoming requiests with json payloads (from req.body)
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


// app.get("/", (req, res) => {
//     //root route http://localhost:5000/
//     res.send("Hello Phu, wellcome to Chat Onlineeeeeeeeeeeeeeeeeeeeeeeeeee!");
// });

// Middleware để parse các request body
//check request
// authRoutes.use((req, res, next) => {
//     console.log(`Request to authRoutes: ${req.method} ${req.url}`);
//     next();
// });

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`);
});