import { sequelize } from "./src/connection.js";
import Blog from "./src/models/Blog.js";

const data = await Blog.findAll();

for (let i = 0; i < data.length; i++) {
    const element = data[i];
    console.log(`${element.author}: ${element.title}, ${element.likes} likes`);
}

sequelize.close();