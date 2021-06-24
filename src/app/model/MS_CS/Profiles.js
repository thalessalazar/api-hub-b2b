import Sequelize, { Model } from "sequelize";

class Profile extends Model {
    static init(sequelize) {
        super.init(
            {
                description: Sequelize.STRING,
            },
            {
                sequelize,
                name: {
                    singular: "profile",
                    plural: "profiles",
                },
            }
        );
    }

    static associate(models) {
        this.hasMany(models.Cargo);
    }
}

export default Profile;
