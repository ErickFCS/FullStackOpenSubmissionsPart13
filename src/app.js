import "express-async-errors";
import { errorHandler } from "./middlewares.js";
import authors from "./routers/authors.js";
import blogs from "./routers/blogs.js";
import express from "express";
import login from "./routers/login.js";
import readingList from "./routers/readinglists.js";
import users from "./routers/users.js";
import logout from "./routers/logout.js";

const app = express();

app.use(express.json());

app.use("/api/authors", authors);
app.use("/api/blogs", blogs);
app.use("/api/login", login);
app.use("/api/logout", logout);
app.use("/api/readinglist", readingList);
app.use("/api/users", users);

app.get("/ping", (req, res) => {
    res.send("pong");
});

app.get("/", (req, res) => {
    res.redirect("/ping");
});

app.use(errorHandler);

export default app;
