import Sequelize, { Model } from "sequelize";

class License extends Model {
    static init(sequelize) {
        super.init(
            {
                purchase_date: Sequelize.DATE,
                amount_employees: Sequelize.INTEGER,
                amount_employees_active: Sequelize.INTEGER,
                onboarding_done: Sequelize.BOOLEAN,
                onboarding_done_at: Sequelize.DATE,
            },
            {
                sequelize,
                name: {
                    singular: "license",
                    plural: "licenses",
                },
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Company, {
            foreignKey: "company_id",
        });
    }
}

export default License;
