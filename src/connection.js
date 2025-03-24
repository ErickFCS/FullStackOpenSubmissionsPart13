import { Sequelize } from "sequelize";
import { URI } from "./config.js";

const sequelize = new Sequelize(URI)

export default sequelize;