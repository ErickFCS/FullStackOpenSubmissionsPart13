import "express-async-errors";
import { blogSchema } from "../schemas.js";
import { JWT_SECRET } from "../config.js";
import { Op } from "sequelize";
import { Router } from "express";
import jwt from "jsonwebtoken";
import models from "../models/index.js";

const Blog = models.Blog;
const User = models.User;
const blogs = Router();

blogs.get("/", async (req, res) => {
    const search = req.query.search;
    let where = {
        [Op.or]: {
            title: {
                [Op.iLike]: `%${search}%`
            },
            author: {
                [Op.iLike]: `%${search}%`
            }
        }
    };
    if (!search) where = {};
    const allBlogs = (await Blog.findAll({
        attributes: {
            exclude: ["userId"]
        },
        order: [
            ["likes", "DESC"]
        ],
        include: {
            model: User,
            attributes: {
                exclude: [
                    "password",
                    "createdAt",
                    "updatedAt"
                ]
            }
        },
        where: where
    })).map((e) => (e.toJSON()));
    res.json(allBlogs);
});

const decodeToken = async (req, res, next) => {
    const rawToken = req.get("Authorization");
    if (typeof rawToken !== "string") throw { name: "Forbiden", message: "Invalid token" };
    if (!rawToken.startsWith("Bearer ")) throw { name: "Forbiden", message: "Invalid token" };
    const token = rawToken.slice(7);
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(decodedToken.id);
    if (!user) throw { name: "Forbiden", message: "Invalid token" };
    req.user = user;
    next();
};

blogs.post("/", decodeToken, async (req, res) => {
    const user = req.user;
    const { author, url, title } = req.body;
    const newBlog = await blogSchema.validate({
        author,
        url,
        title,
        userId: user.getDataValue("id")
    });
    const createdBlog = await Blog.create(newBlog);
    res.json(createdBlog);
});

const noteFinder = async (req, res, next) => {
    const targetBlog = await Blog.findByPk(req.params.id);
    if (!targetBlog)
        next({ name: "NotFound", message: "Blog not found" });
    req.targetBlog = targetBlog;
    next();
};

blogs.put("/:id", noteFinder, async (req, res) => {
    const targetBlog = req.targetBlog;
    targetBlog.set("likes");
    const savedBlog = await targetBlog.save();
    res.json({ likes: savedBlog.get("likes") });
});

blogs.delete("/:id", noteFinder, decodeToken, async (req, res) => {
    const user = req.user;
    const targetBlog = req.targetBlog;
    if (targetBlog.getDataValue("userId") !== user.id) throw { name: "Forbiden", message: "You dont own this blog" };
    await targetBlog.destroy();
    res.sendStatus(204);
});

export default blogs;