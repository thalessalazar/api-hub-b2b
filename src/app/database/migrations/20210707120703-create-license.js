/* eslint-disable arrow-body-style */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        queryInterface.createTable("license", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            purchase_date: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: new Date(),
            },
            amount_employees: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            amount_employees_active: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            onboarding_done: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            onboarding_done_at: {
                type: Sequelize.DATE,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: async (queryInterface) => {
        return queryInterface.dropTable("license");
    },
};
