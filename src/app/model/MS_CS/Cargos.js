import Sequelize, { Model } from "sequelize";

class Cargo extends Model {
    static init(sequelize) {
        super.init(
            {
                tax_nomenclature: Sequelize.STRING,
                cbo: Sequelize.STRING,
                vinculo: Sequelize.ENUM("CLT", "PJ", "SÓCIO"),
                kpi_csv: Sequelize.TEXT,
                kpi_array: Sequelize.VIRTUAL,
            },
            {
                sequelize,
                name: {
                    singular: "cargo",
                    plural: "cargos",
                },
            }
        );

        // eslint-disable-next-line arrow-body-style
        this.addHook("beforeSave", async (cargo) => {
            cargo.vinculo = cargo.vinculo.toUpperCase();
            cargo.kpi_csv = cargo.kpi_array.join(",");
        });

        // eslint-disable-next-line arrow-body-style
        this.addHook("beforeUpdate", async (cargo) => {
            cargo.vinculo = cargo.vinculo.toUpperCase();
            cargo.kpi_csv = cargo.kpi_array.join(",");
        });
    }

    static associate(models) {
        this.belongsTo(models.Area, {
            foreignKey: "area_id",
        });
        this.belongsTo(models.Profile, {
            foreignKey: "profile_id",
        });
        this.belongsTo(models.Level, {
            foreignKey: "level_id",
        });
    }
}

export default Cargo;
