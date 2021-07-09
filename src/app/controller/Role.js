import * as Yup from "yup";
import { Op } from "sequelize";
import { parseISO } from "date-fns";
import Role from "../model/MS_CS/Roles";

class RoleController {
    async index(req, res) {
        const {
            usual_nomenclature,
            average_wage,
            synthetic_description,
            activities,
            requirements,
            indicators,
            desired_graduation,
            knowledge,
            skills,
            attitude,
            role_target_id,
            cargo_id,
            createdBefore,
            createdAfter,
            updatedBefore,
            updatedAfter,
            sort,
        } = req.query;

        const limit = req.query.limit || null;
        const page = req.query.page || null;

        let order = [];
        let where = {};

        if (usual_nomenclature) {
            where = {
                ...where,
                usual_nomenclature: {
                    [Op.iLike]: `%${usual_nomenclature}%`,
                },
            };
        }

        if (average_wage) {
            where = {
                ...where,
                average_wage: {
                    [Op.eq]: `%${average_wage}%`,
                },
            };
        }

        if (synthetic_description) {
            where = {
                ...where,
                synthetic_description: {
                    [Op.iLike]: `%${synthetic_description}%`,
                },
            };
        }

        if (activities) {
            where = {
                ...where,
                activities_csv: {
                    [Op.iLike]: `%${activities}%`,
                },
            };
        }

        if (requirements) {
            where = {
                ...where,
                requirements_csv: {
                    [Op.iLike]: `%${requirements}%`,
                },
            };
        }

        if (indicators) {
            where = {
                ...where,
                indicators_csv: {
                    [Op.iLike]: `%${indicators}%`,
                },
            };
        }

        if (desired_graduation) {
            where = {
                ...where,
                desired_graduation: {
                    [Op.iLike]: `%${desired_graduation}%`,
                },
            };
        }

        if (knowledge) {
            where = {
                ...where,
                knowledge_csv: {
                    [Op.iLike]: `%${knowledge}%`,
                },
            };
        }

        if (skills) {
            where = {
                ...where,
                skills_csv: {
                    [Op.iLike]: `%${skills}%`,
                },
            };
        }

        if (attitude) {
            where = {
                ...where,
                attitude_csv: {
                    [Op.iLike]: `%${attitude}%`,
                },
            };
        }

        if (role_target_id) {
            where = {
                ...where,
                role_target_id,
            };
        }

        if (cargo_id) {
            where = {
                ...where,
                cargo_id,
            };
        }

        if (createdBefore) {
            where = {
                ...where,
                created_at: {
                    [Op.gte]: parseISO(createdBefore),
                },
            };
        }

        if (createdAfter) {
            where = {
                ...where,
                created_at: {
                    [Op.lte]: parseISO(createdAfter),
                },
            };
        }

        if (updatedBefore) {
            where = {
                ...where,
                updated_at: {
                    [Op.gte]: parseISO(updatedBefore),
                },
            };
        }

        if (updatedAfter) {
            where = {
                ...where,
                updated_at: {
                    [Op.lte]: parseISO(updatedAfter),
                },
            };
        }

        if (sort) {
            order = sort.split(",").map((item) => item.split(":"));
        }

        const data = await Role.findAll({
            where,
            order,
            limit,
            offset: limit * page - limit,
        });

        return res.status(201).json(data);
    }

    async show(req, res) {
        const { id } = req.params.id;

        const role = await Role.findByPk(id);

        if (!role) {
            return res.status(404).json();
        }

        return res.status(201).json(role);
    }

    async create(req, res) {
        const Schema = Yup.object().shape({
            usual_nomenclature: Yup.string().required(),
            average_wage: Yup.number(),
            synthetic_description: Yup.string().required(),
            activities_array: Yup.array(),
            requirements_array: Yup.array(),
            indicators_array: Yup.array(),
            desired_graduation_array: Yup.array(),
            knowledge_array: Yup.array(),
            skills_array: Yup.array(),
            attitude_array: Yup.array(),
            role_target_id: Yup.number().integer(),
            cargo_id: Yup.number().integer(),
        });

        if (!(await Schema.isValid(req.body))) {
            return res.status(400).json({ error: "Error on validate Schema" });
        }

        const role = await Role.create(req.body);

        return res.status(201).json(role);
    }

    async update(req, res) {
        const role = await Role.findByPk(req.params.id);

        if (!role) {
            return res.status(404).json();
        }

        const Schema = Yup.object().shape({
            usual_nomenclature: Yup.string(),
            average_wage: Yup.number(),
            synthetic_description: Yup.string(),
            activities_array: Yup.array(),
            requirements_array: Yup.array(),
            indicators_array: Yup.array(),
            desired_graduation_array: Yup.array(),
            knowledge_array: Yup.array(),
            skills_array: Yup.array(),
            attitude_array: Yup.array(),
            role_target_id: Yup.number().integer(),
            cargo_id: Yup.number().integer(),
        });

        if (!(await Schema.isValid(req.body))) {
            return res.status(400).json({ error: "Error on validate Schema" });
        }

        const newRole = await role.update(req.body);

        return res.status(201).json(newRole);
    }

    async destroy(req, res) {
        const { id } = req.params;

        const role = await Role.findByPk(id);

        if (!role) {
            return res.status(404).json();
        }

        await role.destroy();

        return res.status(200).jsos();
    }
}

export default new RoleController();
