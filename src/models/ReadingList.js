import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.js";

class ReadingList extends Model { }
ReadingList.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: { model: "users", key: "id" },
        allowNull: false
    },
    blogId: {
        type: DataTypes.INTEGER,
        references: { model: "blogs", key: "id" },
        allowNull: false
    },
    unread: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: "readingList"
});

export default ReadingList;