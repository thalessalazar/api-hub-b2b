/* eslint-disable arrow-body-style */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        queryInterface.createTable("cargos", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            tax_nomenclature: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            cbo: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            vinculo: {
                type: Sequelize.ENUM("CLT", "PJ", "SÓCIO"),
                allowNull: false,
                defaultValue: "CLT",
            },
            kpi_csv: {
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
            area_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "areas",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
                allowNull: false,
            },
            profile_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "profiles",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
                allowNull: false,
            },
            level_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "levels",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
                allowNull: false,
            },
        });
    },

    down: async (queryInterface) => {
        return queryInterface.dropTable("cargos");
    },
};
