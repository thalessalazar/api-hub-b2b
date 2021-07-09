/* eslint-disable arrow-body-style */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.addColumn("license", "company_id", {
            type: Sequelize.INTEGER,
            references: {
                model: "company",
                key: "id",
            },
            allowNull: false,
        });
    },

    down: async (queryInterface) => {
        return queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.removeColumn("license", "company_id", {
                transaction,
            });
        });
    },
};
