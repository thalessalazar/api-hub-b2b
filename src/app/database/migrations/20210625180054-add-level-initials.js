/* eslint-disable arrow-body-style */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.addColumn("levels", "initials", {
            type: Sequelize.STRING,
            allowNull: false,
        });
    },

    down: async (queryInterface) => {
        return queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.removeColumn("levels", "initials", {
                transaction,
            });
        });
    },
};
