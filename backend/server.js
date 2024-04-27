import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    //root route http://localhost:5000/
    res.send("Hello Phu, wellcome to Chat Onlineeeeeeeeeeeeeeeeeeeeeeeeeee!");
});

// Middleware để parse các request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
// authRoutes.use((req, res, next) => {
//     console.log(`Request to authRoutes: ${req.method} ${req.url}`);
//     next();
// });

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));