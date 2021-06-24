import Sequelize, { Model } from "sequelize";

class Area extends Model {
    static init(sequelize) {
        super.init(
            {
                description: Sequelize.STRING,
                initials: Sequelize.STRING,
            },
            {
                sequelize,
                name: {
                    singular: "area",
                    plural: "areas",
                },
            }
        );

        // eslint-disable-next-line arrow-body-style
        this.addHook("beforeSave", async (area) => {
            area.initials = area.initials.toUpperCase();
        });

        // eslint-disable-next-line arrow-body-style
        this.addHook("beforeUpdate", async (area) => {
            area.initials = area.initials.toUpperCase();
        });
    }

    static associate(models) {
        this.hasMany(models.Cargo);
    }
}

export default Area;
