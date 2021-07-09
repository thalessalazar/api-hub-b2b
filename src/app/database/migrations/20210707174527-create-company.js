/* eslint-disable arrow-body-style */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        queryInterface.createTable("company", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            corporate_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            fantasy_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            postal_code: {
                type: Sequelize.STRING,
                allowNull: false,
                length: 8,
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
            district: {
                type: Sequelize.STRING,
                allowNull: false,
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
            ibge_code: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            phone: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            phone2: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            cnpj: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            state_registration: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            crt: {
                type: Sequelize.ENUM("1", "2", "3"),
                allowNull: false,
                defaultValue: "1",
            },
            cnae_code: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            responsible: {
                type: Sequelize.STRING,
                allowNull: true,
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
        return queryInterface.dropTable("company");
    },
};
