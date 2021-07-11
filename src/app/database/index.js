import Sequelize from "sequelize";
import config from "../config/database";

import User from "../model/User";
import Area from "../model/MS_CS/Areas";
import Cargo from "../model/MS_CS/Cargos";
import Level from "../model/MS_CS/Levels";
import Profile from "../model/MS_CS/Profiles";
import Role from "../model/MS_CS/Roles";
import Company from "../model/Company";
import License from "../model/License";
import BranchOffice from "../model/branchoffice";

const models = [
    User,
    Area,
    Level,
    Profile,
    Cargo,
    Role,
    Company,
    License,
    BranchOffice,
];

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
