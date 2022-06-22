const { request, response } = require('express');
const { Product } = require('../models');


exports.getProduct = async (req = request, res = response) => {
    try {
        const { limit = 5, since = 0 } = req.query;
        const query = { status: true };

        const [products, totalProducts] = await Promise.all([
            Product.find(query)
                .populate('user', ['name', 'email'])
                .populate('category', 'name')
                .skip(since)
                .limit(limit),
            Product.countDocuments(query)
        ])
        if (totalProducts === 0) {
            return res.status(204).json({
                ok: true,
                msg: 'No content'
            })
        }

        res.status(200).json({
            ok: true,
            products,
            totalProducts
        })


    } catch (e) {
        res.status(500).json({
            ok: false,
            msg:`${e}`
        })
    }
}

exports.getProductID = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        res.status(200).json({
            ok: true,
            product
        })

    } catch (e) {
        res.status(500).json({
            ok: false,
            msg:`${e}`
        })
    }
}

exports.postProduct = async (req = request, res = response) => {
    try {
        const { status, user, ...body } = req.body;
        body.name = body.name.toUpperCase();

        const productDB = await Product.findOne({ name: body.name })
        if (productDB) {
            return res.status(401).json({
                ok: false,
                msg: 'Product ready exist',
                name: body.name
            })
        }

        const data = {
            ...body,
            nam: body.name,
            user: req.userAuth._id
        }

        const product = new Product(data);
        product.save();

        res.status(201).json({
            ok: true,
            product
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            ok: false,
            msg:`${e}`
        })
    }
}


exports.putProduct = async (req = request, res = response) => {
    try {
        // const { id } = req.params
        const { status, user, ...body } = req.body;
        const data = {
            ...body,
            name: body.name.toUpperCase(),
            user: req.userAuth._id
        }
        const product = await Product.findByIdAndUpdate(id, data, { new: true })

        res.status(202).json({
            ok: true,
            product
        })
    } catch (e) {
        res.status(500).json({
            ok: false,
            msg:`${e}`
        })
    }
}

exports.deleteProduct = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const userAuth = req.userAuth
        const product = await Product.findByIdAndUpdate(id, { status: false });

        res.status(202).json({
            ok: true,
            product,
            userAuth
        })

    } catch (e) {
        res.status(500).json({
            ok: false,
            msg:`${e}`
        })
    }
}