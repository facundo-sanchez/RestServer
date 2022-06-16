
const { Router } = require('express');
const { check, body } = require('express-validator');

const { getUser, putUser, deleteUser, postUser, getUserID } = require('../controller/user.controller');
const { isEmailUsed, isRoleValid, isUserID, isAdmin } = require('../helpers/db.validators');

// const { validateInputs, validatePage } = require('../middlewares/validators/validate.input');
// const { validateJWT } = require('../middlewares/validators/validate.jwt');
// const { validateRole,validateIsAdmin } = require('../middlewares/validators/validate.role');

const {validateInputs,validateJWT,validateRole,validateIsAdmin} = require('../middlewares');

const router = Router();

router.get('/', [
    validateInputs
], getUser);

router.get('/:id', [
    check('id', 'The ID is invalid').isMongoId(),
    check('id').custom(isUserID),
    validateInputs
], getUserID);

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password min length is 6').isLength({ min: 5 }),
    check('email', 'Email is invalid').isEmail(),
    check('email').custom(isEmailUsed),
    check('role').custom(isRoleValid),
    validateInputs //validador general de todos los inputs
], postUser);

router.put('/:id', [
    // check('_id','The ID is invalid').isMongoId(),
    check('id', 'The ID is invalid').isMongoId(),
    check('id').custom(isUserID),
    check('role').custom(isRoleValid),
    validateInputs
], putUser);

router.delete('/:id', [
    validateJWT,
    validateRole(['ADMIN_ROLE','VENTAS_ROLE']),
    // validateIsAdmin,
    check('id', 'The ID is invalid').isMongoId(),
    check('id').custom(isUserID),
    //credenciales del usuario de sesion
    // check('id').custom(isAdmin),
    validateInputs
], deleteUser);



module.exports = router;