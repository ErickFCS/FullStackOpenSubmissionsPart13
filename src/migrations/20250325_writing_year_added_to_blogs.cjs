const { DataTypes } = require("sequelize")


module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.addColumn("blogs", "publication_year", {
            type: DataTypes.INTEGER,
            validate: {
                min: {
                    args: [1991],
                    msg: "The year must be after 1991"
                },
                max: {
                    args: [(new Date()).getFullYear()],
                    msg: "The book can't be writen in the future"
                },

            }
        })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.removeColumn("blogs", "publication_year")
    }
};