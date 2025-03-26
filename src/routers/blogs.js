import { blogSchema } from "../schemas.js";
import { decodeToken } from "../middlewares.js";
import { Op } from "sequelize";
import { Router } from "express";
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

blogs.post("/", decodeToken, async (req, res) => {
    const user = req.user;
    const { author, url, title, publicationYear } = req.body;
    const newBlog = await blogSchema.validate({
        author,
        url,
        title,
        publicationYear,
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