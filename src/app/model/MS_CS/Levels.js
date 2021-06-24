import Sequelize, { Model } from "sequelize";

class Level extends Model {
    static init(sequelize) {
        super.init(
            {
                description: Sequelize.STRING,
            },
            {
                sequelize,
                name: {
                    singular: "level",
                    plural: "levels",
                },
            }
        );
    }

    static associate(models) {
        this.hasMany(models.Cargo);
    }
}

export default Level;
