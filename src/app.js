import { errorHandler } from "./middlewares.js";
import blogs from "./routers/blogs.js";
import express from "express";
import users from "./routers/users.js";
import login from "./routers/login.js";
import authors from "./routers/authors.js";

const app = express();

app.use(express.json());

app.use("/api/blogs", blogs);
app.use("/api/users", users);
app.use("/api/login", login);
app.use("/api/authors", authors);

app.get("/ping", (req, res) => {
    res.send("pong");
});

app.get("/", (req, res) => {
    res.redirect("/ping");
});

app.use(errorHandler);

export default app;
