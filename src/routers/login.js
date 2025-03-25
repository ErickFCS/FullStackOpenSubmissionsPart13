import { Router } from "express";
import "express-async-errors";
import models from "../models/index.js";
import { userSchema } from "../schemas.js";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

const User = models.User;
const login = Router();

login.post("/", async (req, res) => {
    const { username, password } = req.body;
    await userSchema.validate({ username, password });
    const user = await User.findOne({ where: { username } });
    if (!user) throw { name: "Forbiden", message: "Invalid password or username" };
    const valid = await compare(password, user.getDataValue("password"));
    if (!valid) throw { name: "Forbiden", message: "Invalid password or username" };
    const userForToken = { username, id: user.getDataValue("id") };
    const token = `Bearer ${jwt.sign(userForToken, JWT_SECRET)}`;
    res.json({ token, username });
});

export default login;