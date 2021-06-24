import Sequelize, { Model } from "sequelize";

class Cargo extends Model {
    static init(sequelize) {
        super.init(
            {
                description: Sequelize.STRING,
                initials: Sequelize.STRING,
            },
            {
                sequelize,
                name: {
                    singular: "cargo",
                    plural: "cargos",
                },
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Area, {
            foreignKey: "id_area",
        });
        this.belongsTo(models.Profile, {
            foreignKey: "id_profile",
        });
        this.belongsTo(models.Level, {
            foreignKey: "id_level",
        });
    }
}

export default Cargo;
