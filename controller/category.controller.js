const { request, response } = require('express')
const { Category } = require('../models');

exports.getCategory = async (req = request, res = response) => {
    try {
        const { limit = 5, since = 0 } = req.query;
        const query = { status: true };

        const [categories, totalCategories] = await Promise.all([
            Category.find(query)
                .populate('user', ['name'])
                .skip(since)
                .limit(limit),
            Category.count(query)

        ])
        if (totalCategories == 0) {
            return res.status(204).json({
                ok: true
            })
        }
        res.status(200).json({
            msg: 'Category ok',
            categories,
            totalCategories

        })
    } catch (e) {
        res.status(500).json({
            ok: false,
            msg: e
        })
    }
}

exports.getCategoryID = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const category = await Category.findById(id).populate('user', ['name']);

        res.status(200).json({
            ok: true,
            category
        })

    } catch (e) {
        res.status(500).json({
            ok: false,
            msg: e
        })
    }
}

exports.postCategory = async (req = request, res = response) => {

    try {
        const name = req.body.name.toUpperCase();
        const categoryDB = await Category.findOne({ name });

        if (categoryDB) {
            return res.status(401).json({
                msg: 'Category ready exist',
                name
            })
        }

        const data = {
            name,
            user: req.userAuth._id
        }

        const category = new Category(data)
        await category.save();

        return res.status(201).json({
            msg: 'ok',
            category
        })



    } catch (e) {
        console.log(e)
        res.status(500).json({
            ok: false,
            msg: `${e}`
        })
    }
}

exports.putCategory = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const { status, user, ...data } = req.body;
        data.name = data.name.toUpperCase();
        data.user = req.userAuth._id;
        
        const getNameCategory = await Category.findOne({name:data.name})

        if (getNameCategory) {
            return res.status(404).json({
                ok: false,
                msg: 'Category already exists'
            })
        }

        const updateCategory = await Category.findByIdAndUpdate(id, data, { new: true })

        res.status(201).json({
            msg: 'ok',
            updateCategory
        })
    } catch (e) {
        res.status(500).json({
            ok: false,
            msg: e
        })
    }
}

exports.deleteCategory = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const userAuth = req.userAuth

        const deleteCategory = await Category.findByIdAndUpdate(id, { status: false })

        res.status(202).json({
            ok: true,
            deleteCategory,
            userAuth
        })


    } catch (e) {
        res.status(500).json({
            ok: false,
            msg: e
        })
    }
}
