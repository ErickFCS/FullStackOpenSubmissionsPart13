import { Router } from "express";
import { decodeToken } from "../middlewares.js";
import models from "../models/index.js";

const ActiveLog = models.ActiveLog;
const logout = Router();

logout.delete("/", decodeToken, async (req, res) => {
    const user = req.user;
    await ActiveLog.destroy({ where: { userId: user.getDataValue("id") } });
    res.sendStatus(204);
});

export default logout;