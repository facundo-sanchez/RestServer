const { request, response } = require('express');
const { validationResult } = require('express-validator');
const { Category } = require('../../models');
const ObjectId = require('mongoose').Types.ObjectId;

exports.validateInputs = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
}

exports.validateCategory = async (req = request, res = response, next) => {
    const { category = '' } = req.body;

    if (!category) {
        next()
    }else{
        if (ObjectId.isValid(category)) {
            const categoryDB = await Category.findById(category)
            if (categoryDB) {
                next();
            } else {
                return res.status(400).json({
                    ok: false,
                    error: 'The category no exist'
                })
            }
        } else {
            return res.status(400).json({
                ok: false,
                error: 'The ID is invalid'
            })
        }
    }


}
