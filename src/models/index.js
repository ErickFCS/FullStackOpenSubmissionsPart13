import ActiveLog from "./ActiveLog.js";
import Blog from "./Blog.js";
import ReadingList from "./ReadingList.js";
import User from "./User.js";

User.hasMany(Blog);
Blog.belongsTo(User);
ActiveLog.belongsTo(User);
User.belongsToMany(Blog, { through: ReadingList, as: "reading_list_blogs" });
Blog.belongsToMany(User, { through: ReadingList, as: "in_users_reading_list" });

// User.sync({ alter: true });
// Blog.sync({ alter: true });
// ReadingList.sync({ alter: true })

const models = { Blog, User, ReadingList, ActiveLog };

export default models;