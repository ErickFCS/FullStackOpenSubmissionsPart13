import { boolean, number } from "yup";
import { Router } from "express";
import models from "../models/index.js";
import { decodeToken } from "../middlewares.js";

const Blog = models.Blog;
const User = models.User;
const ReadingList = models.ReadingList;
const readingList = Router();

readingList.post("/", async (req, res) => {
    const blogId = await number().required("No blogId").integer("Id must be an integer").positive("Id must be positive").validate(req.body.blogId);
    const userId = await number().required("No userId").integer("Id must be an integer").positive("Id must be positive").validate(req.body.userId);
    const targetUser = await User.findByPk(userId, { attributes: ["id"] });
    const targetBlog = await Blog.findByPk(blogId, { attributes: ["id"] });
    if (!targetBlog) throw { name: "NotFound", message: "Blog not found" };
    if (!targetUser) throw { name: "NotFound", message: "User not found" };
    const savedReadingList = await ReadingList.create({ userId, blogId });
    res.json(savedReadingList);
});

readingList.put("/:id", decodeToken, async (req, res) => {
    const readingListId = await number().integer("Id must be an integer").positive("Id must be positive").validate(req.params.id);
    const targetReadingList = await ReadingList.findByPk(readingListId);
    if (!targetReadingList) throw { name: "NotFound", message: "reading list entry not found" };
    const user = req.user;
    if (user.id !== targetReadingList.getDataValue("userId")) throw { name: "Forbiden", message: "This in not from your readlist" };
    const readState = await boolean().required("parameter read must be defined").validate(req.body.read);
    targetReadingList.setDataValue("unread", !readState);
    const savedReadingList = await targetReadingList.save();
    res.json(savedReadingList);
});

export default readingList;