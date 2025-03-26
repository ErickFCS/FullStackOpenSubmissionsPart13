import { JWT_SECRET } from "./config.js";
import jwt from "jsonwebtoken";
import models from "./models/index.js";

const User = models.User;
const ActiveLog = models.ActiveLog;

// eslint-disable-next-line no-unused-vars
export const errorHandler = (error, req, res, next) => {
    if (error.name === "ValidationError") {
        res.status(400).send(error.message);
    } else if (error.name === "NotFound") {
        res.status(404).send(error.message);
    } else if (error.name === "Forbiden") {
        res.status(401).send(error.message);
    } else {
        console.log("name", error.name);
        console.log(JSON.stringify(error, null, 2));
        console.log(error);
        res.sendStatus(500);
    }
};

export const decodeToken = async (req, res, next) => {
    const rawToken = req.get("Authorization");
    if (typeof rawToken !== "string") throw { name: "Forbiden", message: "Invalid token" };
    if (!rawToken.startsWith("Bearer ")) throw { name: "Forbiden", message: "Invalid token" };
    const token = rawToken.slice(7);
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(decodedToken.id);
    if (!user) throw { name: "Forbiden", message: "Invalid token" };
    if (user.getDataValue("disable")) {
        await ActiveLog.destroy({ where: { userId: user.getDataValue("id") } });
        throw { name: "Forbiden", message: "Your account was disabled" };
    }
    const logdedIn = await ActiveLog.findOne({ where: { userId: user.getDataValue("id") } });
    if (!logdedIn) throw { name: "Forbiden", message: "No active session" };
    req.user = user;
    next();
};