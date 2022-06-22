const { request, response } = require('express');
const { validationResult } = require('express-validator');
const { Category } = require('../../models');

exports.validateInputs = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
}

exports.validateCategory = async (req = request, res = response, next) => {
    console.log(req.body.category);
    const category = req.body.category;
    if (!category) {
        next()
    } else {
        const categoryDB = await Category.findById(category)
        if(categoryDB){
            next();
        }else{
            return res.status(400).json({
                ok:false,
                error:'The category no exist'
            })
        }
    }

}
