const { request, response, json } = require('express');
const User = require('../models/user');
const bycript = require('bcryptjs');

const getUser = async (req, res = response) => {
    try {
        const { limit = 5, since = 0 } = req.query
        const query = { status: true };

        // const users = await User.find(query).skip(since).limit(limit);
        // const countUsers = await User.countDocuments(query);

        const [users,totalUsers] = await Promise.all([
            User.find(query).skip(since).limit(limit),
            User.countDocuments(query)
        ])

        res.status(200).json({
            users,
            totalUsers
        });

    } catch (e) {
        return res.status(404).json({
            error: `${e}`
        })
    }

}

const getUserID = async (req, res = response) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id)

        // console.log(userSearch)
        res.json({
            user
        })
    } catch (e) {
        return res.status(404).json({
            error: `${e}`
        })
    }
    ;
}


const postUser = async (req = request, res = response) => {
    try {
        const { name, email, password, role,/* img,role,google*/ } = req.body;
        const user = new User({ name, email, password, role });

        //Hash password
        const salt = bycript.genSaltSync(10); //10 default
        user.password = bycript.hashSync(password, salt);

        //save en db
        await user.save();

        //show user created
        res.status(201).json({
            user
        });
    } catch (e) {
        return res.status(400).json({ msgError: `Error ${e}` });
    }
}

const putUser = async (req, res = response) => {

    try {
        const { id } = req.params
        const { _id, password, google, email, ...rest } = req.body;

        if (password) {
            //Hash password
            const salt = bycript.genSaltSync(10); //10 default
            rest.password = bycript.hashSync(password, salt);
        }

        const user = await User.findByIdAndUpdate(id, rest);

        res.status(201).json({
            user
        });
    } catch (e) {
        return res.status(404).json({
            error: `${e}`
        })
    }

}



const deleteUser = async (req, res = response) => {
    try {
        const { id } = req.params;
        // const userDelete = await User.findByIdAndDelete(id);
        const userDelete = await User.findByIdAndUpdate(id,{status:false})

        res.status(202).json({
            msg: 'User delete',
            userDelete,
        });
    } catch (e) {
        return res.status(404).json({
            error: `${e}`
        })
    }

}


module.exports = {
    getUser,
    getUserID,
    putUser,
    postUser,
    deleteUser
};