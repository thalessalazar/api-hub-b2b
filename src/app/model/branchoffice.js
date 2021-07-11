import Sequelize, { Model } from "sequelize";

class BranchOffice extends Model {
    static init(sequelize) {
        super.init(
            {
                postal_code: Sequelize.STRING,
                address: Sequelize.STRING,
                address_number: Sequelize.STRING,
                address_complement: Sequelize.STRING,
                district: Sequelize.STRING,
                country_code: Sequelize.STRING,
                country: Sequelize.STRING,
                state: Sequelize.STRING,
                city: Sequelize.STRING,
                ibge_code: Sequelize.STRING,
                cnpj: Sequelize.STRING,
                state_registration: Sequelize.STRING,
                phone: Sequelize.STRING,
                email: Sequelize.STRING,
            },
            {
                sequelize,
                name: {
                    singular: "branchoffice",
                    plural: "branchoffices",
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

export default BranchOffice;
