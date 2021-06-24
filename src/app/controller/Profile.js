import * as Yup from "yup";
import { Op } from "sequelize";
import { parseISO } from "date-fns";
import Profile from "../model/MS_CS/Profiles";

class ProfileController {
    async index(req, res) {
        const {
            description,
            createdBefore,
            createdAfter,
            updatedBefore,
            updatedAfter,
            sort,
        } = req.query;

        const page = req.query.page || 1;
        const limit = req.query.limit || 25;

        let where = {};
        let order = [];

        if (description) {
            where = {
                ...where,
                description: {
                    [Op.iLike]: description,
                },
            };
        }

        if (createdBefore) {
            where = {
                ...where,
                email: {
                    [Op.gte]: parseISO(createdBefore),
                },
            };
        }

        if (createdAfter) {
            where = {
                ...where,
                email: {
                    [Op.lte]: parseISO(createdAfter),
                },
            };
        }

        if (updatedBefore) {
            where = {
                ...where,
                email: {
                    [Op.gte]: parseISO(updatedBefore),
                },
            };
        }

        if (updatedAfter) {
            where = {
                ...where,
                email: {
                    [Op.lte]: parseISO(updatedAfter),
                },
            };
        }

        if (sort) {
            order = sort.split(",").map((item) => item.split(":"));
        }

        const data = await Profile.findAll({
            where,
            order,
            limit,
            offset: limit * page - limit,
        });

        return res.status(201).json(data);
    }

    async show(req, res) {
        const { id } = req.params;

        const profile = await Profile.findByPk(id);

        if (!profile) {
            return res.status(404).json();
        }

        return res.json(profile);
    }

    async create(req, res) {
        const Schema = Yup.object().shape({
            description: Yup.string().required(),
        });

        if (!(await Schema.isValid(req.body))) {
            return res.status(400).json({ error: "Error on validate Schema" });
        }

        const profile = await Profile.create(req.body);
        return res.status(201).json(profile);
    }

    async update(req, res) {
        const { id } = req.params;

        const Schema = Yup.object().shape({
            description: Yup.string(),
        });

        if (!(await Schema.isValid(req.body))) {
            return res.status(400).json({ error: "Error on validate Schema" });
        }

        const profile = await Profile.findByPk(id);

        if (!profile) {
            return res.status(404).json();
        }

        const newProfile = await profile.update(req.body);

        return res.status(201).json(newProfile);
    }

    async destroy(req, res) {
        const { id } = req.params;

        const profile = await Profile.findByPk(id);

        if (!profile) {
            return res.status(404).json();
        }

        await profile.destroy();

        return res.json();
    }
}

export default new ProfileController();
