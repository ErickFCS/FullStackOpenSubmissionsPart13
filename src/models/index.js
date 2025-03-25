import Blog from "./Blog.js";
import User from "./User.js";

User.hasMany(Blog);
Blog.belongsTo(User);
Blog.sync({ alter: true });
User.sync({ alter: true });

const models = { Blog, User };

export default models;