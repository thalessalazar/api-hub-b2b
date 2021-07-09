/* eslint-disable arrow-body-style */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.changeColumn("cargos", "kpi_csv", {
            type: Sequelize.TEXT,
            allowNull: false,
            defaultValue: "",
        });
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.changeColumn("cargos", "kpi_csv", {
            type: Sequelize.TEXT,
            allowNull: false,
        });
    },
};
