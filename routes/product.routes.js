const {Router} = require('express');
const {check} = require('express-validator')
const { getProduct, getProductID, postProduct, putProduct, deleteProduct } = require('../controller/product.controller');
const { isProductID, isCategoryID } = require('../helpers/db.validators');
const { validateInputs, validateJWT, validateRole, validateCategory } = require('../middlewares');


const router = Router();

router.get('/',[],getProduct);

router.get('/:id',[
    check('id','The ID is invalid').isMongoId(),
    check('id').custom(isProductID),
    validateInputs
],getProductID);

router.post('/',[
    validateJWT,
    check('name','The name is required').not().isEmail(),
    check('category').isMongoId(),
    check('category').custom(isCategoryID),
    validateInputs
],postProduct);

router.put('/:id',[
    validateJWT,
    validateRole(['ADMIN_ROLE']),
    check('id','The ID is invalid').isMongoId(),
    check('id').custom(isProductID),
    check('name','The name is required').not().isEmpty(),
    // check('category').isMongoId(),
    // check('category').custom(isCategoryID),
    validateInputs,
    validateCategory
],putProduct);

router.delete('/:id',[
    validateJWT,
    validateRole(['ADMIN_ROLE']),
    check('id','The ID is invalid').isMongoId(),
    check('id').custom(isProductID),
    validateInputs
],deleteProduct);

module.exports = router