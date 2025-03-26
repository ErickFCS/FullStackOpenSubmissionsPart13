const { DataTypes } = require("sequelize")

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable("blogs", {
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
                defaultValue: 0
            },
            created_at: {
                type: DataTypes.DATE
            },
            updated_at: {
                type: DataTypes.DATE
            },
        }, {
            underscored: true,
        });
        await queryInterface.createTable("users", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: {
                        msg: "Username must be a valid email"
                    }
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            created_at: {
                type: DataTypes.DATE
            },
            updated_at: {
                type: DataTypes.DATE
            },
        }, {
            underscored: true,
        });
        await queryInterface.addColumn("blogs", "user_id", {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            }
        });
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable("blogs");
        await queryInterface.dropTable("users");
    }
};