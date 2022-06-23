const { request, response } = require("express");
const { User, Category, Product } = require("../models");
const { ObjectId } = require('mongoose').Types

const collectionsAvaibles = [
    'user',
    'category',
    'product',
    'role'
];

const isMongoID = (terms = '') => {
    const isMongoID = ObjectId.isValid(terms);
    if (isMongoID) {
        return true;
    }
    return false;
}

const searchUsers = async (terms = '', res = response) => {

    if (isMongoID(terms)) {
        const results = await User.findById(terms);

        return res.status(results ? 200 : 204).json({
            ok: true,
            results: results ? results : []
        });
    }

    const regex = new RegExp(terms, 'i');

    const results = await User.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ status: true }]
    });
    return res.status(results ? 200 : 204).json({
        ok: true,
        results: results ? results : []
    });

}

const searcCategory = async (terms = '', res = response) => {

    if (isMongoID(terms)) {
        const results = await Category.findById(terms);

        return res.status(results ? 200 : 204).json({
            ok: true,
            results
        })
    }

    const regex = new RegExp(terms, 'i');

    const results = await Category.find({
        name: regex
    })

    return res.status(results ? 200 : 204).json({
        ok: true,
        results
    })
}

const searcProduct = async (terms = '', res = response) => {

    if (isMongoID(terms)) {
        const results = await Product.findById(terms)
            .populate('category', 'name')
            .populate('user', ['name', 'email']);

        if (results) {
            return res.status(200).json({
                ok: true,
                results
            })
        } else {
            const results = await Product.find({ category: ObjectId(terms) })
                .populate('category', 'name')
                .populate('user', ['name', 'email']);
            return res.status(results ? 200 : 204).json({
                ok: true,
                results
            })
        }
    }

    if (!isNaN(terms)) {
        const results = await Product.find({
            $or: [{ price: Number(terms) }],
            $and: [{ status: true }, { available: true }]
        }).populate('category', 'name').populate('user', ['name', 'email']);

        return res.status(results ? 200 : 204).json({
            ok: true,
            results
        })
    }

    const regex = new RegExp(terms, 'i');
    const results = await Product.find({
        $or: [{ name: regex }, { description: regex }],
        $and: [{ status: true }, { available: true }]
    }).populate('category', 'name').populate('user', ['name', 'email']);

    return res.status(results ? 200 : 204).json({
        ok: true,
        results
    })
}

exports.search = async (req = request, res = response) => {
    try {

        const { collection, terms } = req.params

        if (!collectionsAvaibles.includes(collection)) {
            return res.status(400).json({
                ok: false,
                msg: `Avaible collections are ${collectionsAvaibles}`
            })
        }

        switch (collection) {
            case 'user':
                await searchUsers(terms, res);
                break;

            case 'category':
                await searcCategory(terms, res);
                break;

            case 'product':
                await searcProduct(terms, res)
                break;

            case 'role':

                break;

            default:
                return res.status(500).json({
                    ok: false,
                    msg: 'Search not found'
                })
        }

    } catch (e) {
        return res.status(500).json({
            ok: false,
            msg: `${e}`
        })
    }
}