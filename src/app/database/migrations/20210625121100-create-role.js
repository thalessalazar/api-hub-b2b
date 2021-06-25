/* eslint-disable arrow-body-style */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        queryInterface.createTable("roles", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            usual_nomenclature: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            average_wage: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
                default: 0.0,
            },
            commission: {
                type: Sequelize.BOOLEAN,
                default: false,
            },
            synthetic_description: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            activities_csv: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            requirements_csv: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            indicators_csv: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            desired_graduation: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            knowledge_csv: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            skills_csv: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            attitude_csv: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },

            // 1 - n
            role_target_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "roles",
                    key: "id",
                },
                allowNull: true,
            },
        });
    },

    down: async (queryInterface) => {
        return queryInterface.dropTable("roles");
    },
};
