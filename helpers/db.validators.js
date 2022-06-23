const Role = require('../models/role');
const { Category, User, Product } = require('../models/');

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
    if (verifyUser.role !== 'ADMIN_ROLE') throw new Error(`The User ${id} not Admin`);
}

exports.isCategoryID = async (id = '') => {
    const verifyCategory = await Category.findById(id);
    if (!verifyCategory) throw new Error(`The ID ${id} not exist`);
}

exports.isProductID = async (id = '') => {
    const verifyProduct = await Product.findById(id);
    if(!verifyProduct) throw new Error(`The ID ${id} not exist`);
}


exports.isIdValid = async () => {

}
