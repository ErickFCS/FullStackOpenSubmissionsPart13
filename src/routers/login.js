import { compare } from "bcrypt";
import { JWT_SECRET } from "../config.js";
import { Router } from "express";
import { userSchema } from "../schemas.js";
import jwt from "jsonwebtoken";
import models from "../models/index.js";

const User = models.User;
const ActiveLog = models.ActiveLog;
const login = Router();

login.post("/", async (req, res) => {
    const { username, password } = req.body;
    await userSchema.validate({ username, password });
    const user = await User.findOne({ where: { username } });
    if (!user) throw { name: "Forbiden", message: "Invalid password or username" };
    const valid = await compare(password, user.getDataValue("password"));
    if (!valid) throw { name: "Forbiden", message: "Invalid password or username" };
    await ActiveLog.destroy({ where: { userId: user.getDataValue("id") } });
    if (user.getDataValue("disable")) throw { name: "Forbiden", message: "Your account was disabled" };
    const userForToken = { username, id: user.getDataValue("id") };
    const token = `Bearer ${jwt.sign(userForToken, JWT_SECRET)}`;
    await ActiveLog.create({ userId: user.getDataValue("id") });
    res.json({ token, username });
});

export default login;