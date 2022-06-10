const Role = require('../data/role.data');
const User = require('../models/user');


exports.isRoleValid = async (role = '') => {
    const existRole = await Role.findOne({ role });
    if (!existRole) throw new Error(`The role ${role} not exist`);
}

exports.isEmailUsed = async (email = '') => {
    const verifyEmail = await User.findOne({ email })
    if (verifyEmail) throw new Error(`The email ${email} is used`);
}

exports.isUserID = async (id = '') => {
    const verifyUser = await User.findById(id)
    if (!verifyUser) throw new Error(`The ID ${id} not exist`);
}

exports.isAdmin = async (id = '') => {
    const verifyUser = await User.findById(id)
    if (!verifyUser) throw new Error(`The ID ${id} not exist`);
    if(verifyUser.role !== 'ADMIN_ROLE') throw new Error(`The User ${id} not Admin`);
}

exports.isIdValid = async () => {

}
