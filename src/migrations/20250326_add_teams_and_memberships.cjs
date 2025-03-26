const { DataTypes } = require("sequelize")


module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable("reading_lists", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            user_id: {
                type: DataTypes.INTEGER,
                references: { model: "users", key: "id" },
                allowNull: false
            },
            blog_id: {
                type: DataTypes.INTEGER,
                references: { model: "blogs", key: "id" },
                allowNull: false
            },
            unread: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            }
        })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable("reading_lists")
    }
};