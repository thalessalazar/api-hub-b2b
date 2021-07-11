/* eslint-disable arrow-body-style */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        queryInterface.createTable("branchoffice", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            postal_code: {
                type: Sequelize.STRING,
                allowNull: false,
                length: 8,
            },
            address: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            address_number: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            address_complement: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            district: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            country_code: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            country: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            state: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            city: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            ibge_code: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            cnpj: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            state_registration: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            phone: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
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

            company_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "company",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
                allowNull: false,
            },
        });
    },

    down: async (queryInterface) => {
        return queryInterface.dropTable("branchoffice");
    },
};
