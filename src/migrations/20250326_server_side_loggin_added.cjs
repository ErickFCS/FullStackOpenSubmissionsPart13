const { DataTypes, QueryInterface } = require("sequelize")


module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable("active_logs", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            user_id: {
                type: DataTypes.INTEGER,
                references: { model: "users", key: "id" },
                allowNull: false,
                unique: true
            }
        })
        await queryInterface.addColumn("users", "disable", {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable("active_logs")
        await queryInterface.removeColumn("users", "disable")
    }
};