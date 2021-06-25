import Sequelize, { Model } from "sequelize";

class Role extends Model {
    static init(sequelize) {
        super.init(
            {
                usual_nomenclature: Sequelize.STRING,
                average_wage: Sequelize.NUMERIC(10, 2),
                comission: Sequelize.BOOLEAN,
                synthetic_description: Sequelize.STRING,

                activities_csv: Sequelize.TEXT,
                activities_array: Sequelize.VIRTUAL,

                requirements_csv: Sequelize.TEXT,
                requirements_array: Sequelize.VIRTUAL,

                indicators_csv: Sequelize.TEXT,
                indicators_array: Sequelize.VIRTUAL,

                desired_graduation: Sequelize.TEXT,

                knowledge_csv: Sequelize.TEXT,
                knowledge_array: Sequelize.VIRTUAL,

                skills_csv: Sequelize.TEXT,
                skills_array: Sequelize.VIRTUAL,

                attitude_csv: Sequelize.TEXT,
                attitude_array: Sequelize.VIRTUAL,
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
            cargo.activities_csv = cargo.activities_array.join(",");
            cargo.requirements_csv = cargo.requirements_array.join(",");
            cargo.indicators_csv = cargo.indicators_array.join(",");
            cargo.knowledge_csv = cargo.knowledge_array.join(",");
            cargo.skills_csv = cargo.skills_array.join(",");
            cargo.attitude_csv = cargo.attitude_array.join(",");
        });

        // eslint-disable-next-line arrow-body-style
        this.addHook("beforeUpdate", async (cargo) => {
            cargo.activities_csv = cargo.activities_array.join(",");
            cargo.requirements_csv = cargo.requirements_array.join(",");
            cargo.indicators_csv = cargo.indicators_array.join(",");
            cargo.knowledge_csv = cargo.knowledge_array.join(",");
            cargo.skills_csv = cargo.skills_array.join(",");
            cargo.attitude_csv = cargo.attitude_array.join(",");
        });
    }

    static associate(models) {
        this.belongsTo(models.Cargo, {
            foreignKey: "cargo_id",
        });

        this.hasOne(this, {
            foreignKey: "role_target_id",
            as: "before",
        });
        this.belongsTo(this, {
            foreignKey: "role_target_id",
            as: "target",
        });
    }
}

export default Role;
