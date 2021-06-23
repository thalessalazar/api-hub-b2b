import Sequelize, { Model } from "sequelize";

class User extends Model {
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
    }
}

export default User;
