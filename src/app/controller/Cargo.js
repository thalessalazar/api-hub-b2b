import * as Yup from "yup";
import { Op } from "sequelize";
import { parseISO } from "date-fns";
import Cargo from "../model/MS_CS/Cargos";

class CargoController {
    async index(req, res) {
        const {
            taxNomenclature,
            cbo,
            vinculo,
            kpi,
            areaId,
            profileId,
            levelId,
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

        if (taxNomenclature) {
            where = {
                ...where,
                tax_nomenclature: {
                    [Op.iLike]: `%${taxNomenclature}%`,
                },
            };
        }

        if (cbo) {
            where = {
                ...where,
                cbo: {
                    [Op.eq]: cbo,
                },
            };
        }

        if (vinculo) {
            where = {
                ...where,
                vinculo,
            };
        }

        if (kpi) {
            where = {
                ...where,
                kpi_csv: {
                    [Op.iLike]: `%${kpi}%`,
                },
            };
        }

        if (areaId) {
            where = {
                ...where,
                area_id: {
                    [Op.eq]: areaId,
                },
            };
        }

        if (levelId) {
            where = {
                ...where,
                id_level: levelId,
            };
        }

        if (profileId) {
            where = {
                ...where,
                profile_id: profileId,
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

        const data = await Cargo.findAll({
            where,
            order,
            limit,
            offset: limit * page - limit,
        });

        return res.status(201).json(data);
    }

    async show(req, res) {
        const { id } = req.params;

        const cargo = await Cargo.findByPk(id);

        if (!cargo) {
            return res.status(404).json();
        }

        return res.json(cargo);
    }

    async create(req, res, next) {
        const schema = Yup.object().shape({
            taxNomenclature: Yup.string().required(),
            cbo: Yup.string().required(),
            vinculo: Yup.string().uppercase(),
            kpi: Yup.array().required(),
            areaId: Yup.number().required(),
            profileId: Yup.number().required(),
            levelId: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Error on validate schema" });
        }

        const cargo = await Cargo.create({
            tax_nomenclature: req.body.taxNomenclature,
            cbo: req.body.cbo,
            vinculo: req.body.vinculo,
            kpi_array: req.body.kpi,
            level_id: req.body.levelId,
            profile_id: req.body.profileId,
            area_id: req.body.areaId,
        });

        return res.status(201).json(cargo);
    }

    async update(req, res) {
        const { id } = req.params;

        const schema = Yup.object().shape({
            taxNomenclature: Yup.string(),
            cbo: Yup.string(),
            vinculo: Yup.string().uppercase(),
            kpi: Yup.array(),
            areaId: Yup.number(),
            profileId: Yup.number(),
            levelId: Yup.number(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Error on validate schema" });
        }

        const cargo = await Cargo.findByPk(id);

        if (!cargo) {
            return res.status(404).json();
        }

        let update = {};

        if (req.body.taxNomenclature) {
            update = {
                ...update,
                tax_nomenclature: req.body.taxNomenclature,
            };
        }

        if (req.body.cbo) {
            update = {
                ...update,
                cbo: req.body.cbo,
            };
        }

        if (req.body.vinculo) {
            update = {
                ...update,
                vinculo: req.body.vinculo,
            };
        }

        if (req.body.kpi) {
            update = {
                ...update,
                kpi_array: req.body.kpi,
            };
        }

        if (req.body.levelId) {
            update = {
                ...update,
                level_id: req.body.levelId,
            };
        }

        if (req.body.areaId) {
            update = {
                ...update,
                area_id: req.body.areaId,
            };
        }

        if (req.body.profileId) {
            update = {
                ...update,
                profile_id: req.body.profileId,
            };
        }

        const newCargo = cargo.update(update);

        return res.status(200).json(newCargo);
    }

    async destroy(req, res) {
        const { id } = req.params;

        const cargo = await Cargo.findByPk(id);

        if (!cargo) {
            return res.status(404).json();
        }

        await cargo.destroy();

        return res.json();
    }
}

export default new CargoController();
