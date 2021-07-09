import Sequelize, { Model } from "sequelize";

class Company extends Model {
    static init(sequelize) {
        super.init(
            {
                corporate_name: Sequelize.STRING,
                fantasy_name: Sequelize.STRING,
                postal_code: Sequelize.STRING,
                country_code: Sequelize.STRING,
                country: Sequelize.STRING,
                state: Sequelize.STRING,
                city: Sequelize.STRING,
                district: Sequelize.STRING,
                address: Sequelize.STRING,
                address_number: Sequelize.STRING,
                address_complement: Sequelize.STRING,
                ibge_code: Sequelize.STRING,
                phone: Sequelize.STRING,
                phone2: Sequelize.STRING,
                email: Sequelize.STRING,
                cnpj: Sequelize.STRING,
                state_registration: Sequelize.STRING,
                crt: Sequelize.ENUM("1", "2", "3"),
                cnae_code: Sequelize.STRING,
                responsible: Sequelize.STRING,
            },
            {
                sequelize,
                name: {
                    singular: "company",
                    plural: "companys",
                },
            }
        );
    }

    static associate(models) {
        this.hasOne(models.License);
    }
}

export default Company;
