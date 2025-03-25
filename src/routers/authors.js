import { Router } from "express";
import models from "../models/index.js";
import { col, fn } from "sequelize";

const authors = Router();
const Blog = models.Blog;

authors.get("/", async (req, res) => {
    const authorsData = (await Blog.findAll({
        attributes: [
            [fn("count", col("id")), "articles"],
            [fn("sum", col("likes")), "likes"]
        ],
        group: [
            "author"
        ],
        order: [
            ["likes", "DESC"]
        ]
    })).map((e) => (e.toJSON()));
    res.json(authorsData);
});

export default authors;