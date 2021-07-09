/* eslint-disable arrow-body-style */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.changeColumn("cargos", "level_id", {
            type: Sequelize.INTEGER,
            references: {
                model: "levels",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
            allowNull: false,
            defaultValue: 3,
        });
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.changeColumn("cargos", "level_id", {
            type: Sequelize.INTEGER,
            references: {
                model: "levels",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
            allowNull: false,
        });
    },
};
