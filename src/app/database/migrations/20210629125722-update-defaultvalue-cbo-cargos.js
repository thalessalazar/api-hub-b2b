/* eslint-disable arrow-body-style */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.changeColumn("cargos", "cbo", {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "0000-00",
        });
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.changeColumn("cargos", "cbo", {
            type: Sequelize.STRING,
            allowNull: false,
        });
    },
};
