import express from "express";
import blogs from "./routers/blogs.js";
import { errorHandler } from "./middlewares.js";
const app = express();

app.use(express.json());

app.use("/api/blogs", blogs)

app.get("/ping", (req, res) => {
    res.send("pong");
});

app.get("/", (req, res) => {
    res.redirect("/ping")
});

app.use(errorHandler)

export default app;
