const { getPagination, getPagingData, getOrder } = require('../../utils/queryUtils');
const { Op } = require('@sequelize/core');
const { exists } = require('../../utils/utils');


module.exports = app => {
    const { productsTable } = require('../../models/dbTables');
    const controller = {};

    // Get all products list
    controller.getAll = (req, res) => {
        const where = {
            [Op.and]: []
        };

        if (exists(req.query.name)) where.name = {
            [Op.like]: `%${req.query.name}%`
        };
        if (exists(req.query.description)) where.description = {
            [Op.like]: `%${req.query.description}%`
        };
        if (exists(req.query.typeId)) where[Op.and].push({ typeId: req.query.typeId });

        // Oder field must be ASC or DESC
        const order = getOrder(req.query.field, req.query.order);
        const filters = { where, order, ...getPagination(req.query.page, req.query.size) }

        productsTable.findAndCountAll(filters).then((response) => {
            res.status(200).json(getPagingData(response, req.query.page, req.query.size));
        }).catch(err => {
            console.log("ERROR...:", err);
            res.status(500).json({ error: 'Ocorreu um erro ao buscar a lista de produtos' })
        })
    };

    controller.getAllShort = (req, res) => {
        const fieldsToSelect = { attributes: ["id", "name", "description"] }
        productsTable.findAll(fieldsToSelect).then((response) => {
            res.status(200).json(response);
        }).catch(err => {
            console.log("ERROR...:", err);
            res.status(500).json({ error: 'Ocorreu um erro ao buscar a lista de produtos' })
        })
    };

    // Get product by id
    controller.getById = (req, res) => {
        const seqQuery = { where: { id: req.params.id } }
        productsTable.findAll(seqQuery).then((response) => {
            res.status(200).json(response);
        }).catch(err => {
            console.log("ERROR...:", err);
            res.status(500).json({ error: 'Ocorreu ao buscar o produto pelo id' })
        })
    };

    // Insert new product
    controller.insert = (req, res) => {
        const body = { ...req.body };
        // const body = {
        //   name: req.body.cardName,
        //   price: req.body.price,
        //   description: req.body.description,
        //   typeId: req.body.cardType,
        // };

        productsTable.create(body).then((response) => {
            res.status(200).json({ name: response.name, description: response.description });
        }).catch(err => {
            console.log("ERROR...:", err);
            res.status(500).json({ error: 'Ocorreu um erro ao inserir o produto' })
        })
    };

    // Update product
    controller.update = (req, res) => {
        const body = { ...req.body };
        const seqQuery = { where: { id: req.params.id } }

        productsTable.update(body, seqQuery).then(() => {
            res.status(200).json(true);
        }).catch(err => {
            console.log("ERROR...:", err);
            res.status(500).json({ error: 'Ocorreu um erro ao atualizar o produto' })
        })
    };

    // Delete product
    controller.delete = (req, res) => {
        const seqQuery = { where: { id: req.params.id } }
        productsTable.destroy(seqQuery).then(() => {
            res.status(200).json(true);
        }).catch(err => {
            console.log("ERROR...:", err);
            res.status(500).json({ error: 'Ocorreu um erro ao excluir o produto' })
        })
    };

    return controller;
}