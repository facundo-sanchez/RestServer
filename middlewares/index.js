const validateInputs = require('./validators/validate.input');
const validateJWT = require('./validators/validate.jwt');
const validateRole  = require('./validators/validate.role');

module.exports = {
    ...validateInputs,
    ...validateJWT,
    ...validateRole
}