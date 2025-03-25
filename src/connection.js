import { Sequelize } from "sequelize";
import { URI } from "./config.js";

export const sequelize = new Sequelize(URI);

export const connectToDataBase = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection to database successful");
    } catch (error) {
        console.log(error);
        throw Error("Error while connecting to database");
    }
};