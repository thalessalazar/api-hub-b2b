import Sequelize from "sequelize";
import config from "../config/database";

import User from "../model/User";
import Area from "../model/MS_CS/Areas";
import Cargo from "../model/MS_CS/Cargos";
import Level from "../model/MS_CS/Levels";
import Profile from "../model/MS_CS/Profiles";

const models = [User, Area, Cargo, Level, Profile];

class Database {
    constructor() {
        this.connection = new Sequelize(config);
        this.init();
        this.associate();
    }

    init() {
        models.forEach((model) => model.init(this.connection));
    }

    associate() {
        // eslint-disable-next-line arrow-body-style
        models.forEach((model) => {
            if (model.associate) model.associate(this.connection.models);
        });
    }
}

export default new Database();
