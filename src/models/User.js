import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.js";

class User extends Model { }
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isEmail: {
                msg: "Username must be a valid email"
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    underscored: true,
    modelName: "user"
});

export default User;