import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.js";

class Blog extends Model { }
Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author: {
        type: DataTypes.STRING
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        set() {
            const prev = this.get("likes");
            if (typeof prev === "number")
                this.setDataValue("likes", prev + 1);
            else
                this.setDataValue("likes", 0);
        }
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "blog"
});

export default Blog;