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
                desired_graduation_array: Sequelize.VIRTUAL,

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
                    singular: "role",
                    plural: "roles",
                },
            }
        );

        // eslint-disable-next-line arrow-body-style
        this.addHook("beforeSave", async (role) => {
            role.activities_csv = role.activities_array.join(",");
            role.requirements_csv = role.requirements_array.join(",");
            role.indicators_csv = role.indicators_array.join(",");
            role.knowledge_csv = role.knowledge_array.join(",");
            role.skills_csv = role.skills_array.join(",");
            role.attitude_csv = role.attitude_array.join(",");
            role.desired_graduation = role.desired_graduation_array.join(",");
        });

        // eslint-disable-next-line arrow-body-style
        this.addHook("beforeUpdate", async (role) => {
            role.activities_csv = role.activities_array.join(",");
            role.requirements_csv = role.requirements_array.join(",");
            role.indicators_csv = role.indicators_array.join(",");
            role.knowledge_csv = role.knowledge_array.join(",");
            role.skills_csv = role.skills_array.join(",");
            role.attitude_csv = role.attitude_array.join(",");
            role.desired_graduation = role.desired_graduation_array.join(",");
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
