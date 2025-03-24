import { Sequelize, QueryTypes } from "sequelize";
import { URI } from "./src/config.js";
import sequelize from "./src/connection.js";
import Blog from "./src/models/Blog.js";

// const sequelize = new Sequelize(URI)
// const data = await sequelize.query("SELECT * FROM blogs", {
//     type: QueryTypes.SELECT
// })

const data = await Blog.findAll()

for (let i = 0; i < data.length; i++) {
    const element = data[i];
    console.log(`${element.author}: ${element.title}, ${element.likes} likes`)
}

sequelize.close()