import * as Yup from "yup";
import { Op } from "sequelize";
import { parseISO } from "date-fns";
import Company from "../model/Company";

class CompanyController {
    async index(req, res) {
        const {
            corporate_name,
            fantasy_name,
            postal_code,
            country_code,
            country,
            state,
            city,
            district,
            address,
            address_number,
            address_complement,
            ibge_code,
            phone,
            phone2,
            email,
            cnpj,
            state_registration,
            crt,
            cnae_code,
            responsible,
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

        if (corporate_name) {
            where = {
                ...where,
                corporate_name: {
                    [Op.iLike]: corporate_name,
                },
            };
        }

        if (fantasy_name) {
            where = {
                ...where,
                fantasy_name: {
                    [Op.iLike]: fantasy_name,
                },
            };
        }

        if (postal_code) {
            where = {
                ...where,
                postal_code: {
                    [Op.iLike]: postal_code,
                },
            };
        }

        if (country_code) {
            where = {
                ...where,
                country_code: {
                    [Op.iLike]: country_code,
                },
            };
        }

        if (country) {
            where = {
                ...where,
                country: {
                    [Op.iLike]: country,
                },
            };
        }

        if (state) {
            where = {
                ...where,
                state: {
                    [Op.iLike]: state,
                },
            };
        }

        if (city) {
            where = {
                ...where,
                city: {
                    [Op.iLike]: city,
                },
            };
        }

        if (district) {
            where = {
                ...where,
                district: {
                    [Op.iLike]: district,
                },
            };
        }

        if (address) {
            where = {
                ...where,
                address: {
                    [Op.iLike]: address,
                },
            };
        }

        if (address_number) {
            where = {
                ...where,
                address_number: {
                    [Op.iLike]: address_number,
                },
            };
        }

        if (address_complement) {
            where = {
                ...where,
                address_complement: {
                    [Op.iLike]: address_complement,
                },
            };
        }

        if (ibge_code) {
            where = {
                ...where,
                ibge_code: {
                    [Op.iLike]: ibge_code,
                },
            };
        }

        if (phone) {
            where = {
                ...where,
                phone: {
                    [Op.iLike]: phone,
                },
            };
        }

        if (phone2) {
            where = {
                ...where,
                phone2: {
                    [Op.iLike]: phone2,
                },
            };
        }

        if (email) {
            where = {
                ...where,
                email: {
                    [Op.iLike]: email,
                },
            };
        }

        if (cnpj) {
            where = {
                ...where,
                cnpj: {
                    [Op.iLike]: cnpj,
                },
            };
        }

        if (crt) {
            where = {
                ...where,
                crt: {
                    [Op.iLike]: crt,
                },
            };
        }

        if (cnae_code) {
            where = {
                ...where,
                cnae_code: {
                    [Op.iLike]: cnae_code,
                },
            };
        }

        if (responsible) {
            where = {
                ...where,
                responsible: {
                    [Op.iLike]: responsible,
                },
            };
        }

        if (state_registration) {
            where = {
                ...where,
                state_registration: {
                    [Op.iLike]: state_registration,
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

        const data = await Company.findAll({
            where,
            order,
            limit,
            offset: limit * page - limit,
        });

        return res.status(201).json(data);
    }

    async show(req, res) {
        const { id } = req.params;

        const company = await Company.findByPk(id);

        if (!company) {
            return res.status(404).json(company);
        }

        return res.json(company);
    }

    async create(req, res) {
        const Schema = Yup.object().shape({
            description: Yup.string().required(),
            initials: Yup.string().required(),
        });

        if (!(await Schema.isValid(req.body))) {
            return res.status(400).json({ error: "Error on validate Schema" });
        }

        const company = await Company.create(req.body);
        return res.status(201).json(company);
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

        const company = await Company.findByPk(id);

        if (!company) {
            return res.status(404).json();
        }

        const newCompany = await company.update(req.body);

        return res.status(201).json(newCompany);
    }

    async destroy(req, res) {
        const { id } = req.params;

        const company = await Company.findByPk(id);

        if (!Company) {
            return res.status(404).json();
        }

        await company.destroy();

        return res.json();
    }
}

export default new CompanyController();
