import { DataTypes, Model } from "sequelize";
import sequelize from "../connection.js";

class Blog extends Model { }
Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author: {
        type: DataTypes.CHAR(50),
    },
    url: {
        type: DataTypes.CHAR(50),
        allowNull: false
    },
    title: {
        type: DataTypes.CHAR(50),
        allowNull: false
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "blog"
});
Blog.sync()

export default Blog