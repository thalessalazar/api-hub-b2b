import * as Yup from "yup";
import { Op } from "sequelize";
import { parseISO } from "date-fns";
import Area from "../model/Areas";

class AreaController {
    async index(req, res) {
        const {
            description,
            initials,
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

        if (initials) {
            where = {
                ...where,
                initials: {
                    [Op.iLike]: initials,
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

        const data = await Area.findAll({
            where,
            order,
            limit,
            offset: limit * page - limit,
        });

        return res.status(201).json(data);
    }

    async show(req, res) {
        const { id } = req.params;

        const area = await Area.findByPk(id);

        if (!area) {
            return res.status(404).json(area);
        }

        return res.json(area);
    }

    async create(req, res) {
        const Schema = Yup.object().shape({
            description: Yup.string().required(),
            initials: Yup.string().required(),
        });

        if (!(await Schema.isValid(req.body))) {
            return res.status(400).json({ error: "Error on validate Schema" });
        }

        const area = await Area.create(req.body);
        return res.status(201).json(area);
    }

    async update(req, res) {
        const { id } = req.params;

        const Schema = Yup.object().shape({
            description: Yup.string(),
            initials: Yup.string(),
        });

        if (!(await Schema.isValid(req.body))) {
            return res.status(400).json({ error: "Error on validate Schema" });
        }

        const area = await Area.findByPk(id);

        if (!area) {
            return res.status(404).json();
        }

        const newArea = await area.update(req.body);

        return res.status(201).json(newArea);
    }

    async destroy(req, res) {
        const { id } = req.params;

        const area = await Area.findByPk(id);

        if (!area) {
            return res.status(404).json();
        }

        await area.destroy();

        return res.json();
    }
}

export default new AreaController();
