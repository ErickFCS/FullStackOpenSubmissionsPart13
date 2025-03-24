import 'express-async-errors'
import { blogSchema } from "../schemas.js";
import { Router } from "express";
import Blog from "../models/Blog.js";

const blogs = Router()

blogs.get("/", async (req, res) => {
    const allBlogs = (await Blog.findAll()).map((e) => (e.toJSON()))
    res.json(allBlogs)
})

blogs.post("/", async (req, res) => {
    const { author, url, title } = req.body
    const newBlog = await blogSchema.validate({
        author,
        url,
        title,
    })
    const createdBlog = await Blog.create(newBlog)
    res.json(createdBlog)
})

blogs.delete("/:id", async (req, res) => {
    const targetBlog = await Blog.findByPk(req.params.id)
    if (targetBlog) {
        await targetBlog.destroy()
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})

export default blogs