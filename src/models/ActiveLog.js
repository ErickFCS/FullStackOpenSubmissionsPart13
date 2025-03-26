import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.js";

class ActiveLog extends Model { }
ActiveLog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: { model: "users", key: "id" },
        allowNull: false,
        unique: true
    }
}, {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: "activeLog"
});

export default ActiveLog;