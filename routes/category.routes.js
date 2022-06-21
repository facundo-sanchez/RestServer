const { Router } = require('express');
const {check} = require('express-validator');
const { getCategory, getCategoryID, putCategory, deleteCategory, postCategory } = require('../controller/category.controller');
const { isCategoryID } = require('../helpers/db.validators');
const {validateInputs, validateJWT, validateRole} = require('../middlewares')

const router = Router();


router.get('/',[],getCategory);

router.get('/:id',[
    check('id','The ID is invalid').isMongoId(),
    check('id').custom(isCategoryID),
    validateInputs
],getCategoryID);

router.post('/',[
    validateJWT,
    validateRole(['ADMIN_ROLE']),
    check('name','Name is required').not().isEmpty(),
    validateInputs
],postCategory);

router.put('/:id',[
    validateJWT,
    validateRole(['ADMIN_ROLE']),
    check('id','The ID is invalid').isMongoId(),
    check('id').custom(isCategoryID),
    check('name','Name is required'),
    validateInputs
],putCategory);

router.delete('/:id',[
    validateJWT,
    validateRole(['ADMIN_ROLE']),
    check('id','The ID is invalid').isMongoId(),
    check('id').custom(isCategoryID),
    validateInputs
],deleteCategory);



module.exports = router;