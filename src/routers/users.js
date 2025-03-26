import { Router } from "express";
import models from "../models/index.js";
import { userSchema } from "../schemas.js";
import { boolean, number, string } from "yup";
import { hash } from "bcrypt";

const User = models.User;
const Blog = models.Blog;
const users = Router();

users.get("/", async (req, res) => {
    const users = (await User.findAll({
        include: {
            model: Blog,
            attributes: {
                exclude: ["userId"]
            }
        }
    })).map((e) => (e.toJSON()));
    res.json(users);
});

users.get("/:id", async (req, res) => {
    const userId = await number().integer("Id must be an integer").positive("Id must be positive").validate(req.params.id);
    const readQuery = await boolean().validate(req.query.read);
    let where = {
        unread: !readQuery
    };
    if (readQuery === undefined) where = {};
    const user = await User.findByPk(userId, {
        include: [
            {
                model: Blog,
                attributes: {
                    exclude: ["userId"]
                }
            },
            {
                model: Blog,
                as: "reading_list_blogs",
                through: {
                    attributes: [
                        "id",
                        "unread"
                    ],
                    where
                }
            }
        ]
    });
    if (!user) throw { name: "NotFound", message: "Invalid Id" };
    res.json(user);
});

users.post("/", async (req, res) => {
    const { username, password } = req.body;
    const newUser = await userSchema.validate({ username, password });
    const createdUser = await User.create({
        ...newUser,
        password: await hash(password, 10)
    });
    res.json(createdUser);
});

users.put("/:id", async (req, res) => {
    const targetUser = await User.findByPk(req.params.id);
    if (targetUser) {
        const newUsername = await string().validate(req.body.username);
        targetUser.setDataValue("username", newUsername);
        const savedUser = await targetUser.save();
        res.json(savedUser);
    } else {
        throw { name: "NotFound", message: "User not found" };
    }
});

export default users;