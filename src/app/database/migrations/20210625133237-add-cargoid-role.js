/* eslint-disable arrow-body-style */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.addColumn("roles", "cargo_id", {
            type: Sequelize.INTEGER,
            references: {
                model: "cargos",
                key: "id",
            },
            allowNull: false,
        });
    },

    down: async (queryInterface) => {
        return queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.removeColumn("roles", "cargo_id", {
                transaction,
            });
        });
    },
};
