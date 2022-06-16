const { Router } = require('express');
const { check } = require('express-validator')

const { authUser,authGoogle } = require('../controller/auth.controller');
const { validateInputs } = require('../middlewares/validators/validate.input');

const router = Router();


router.post('/login', [
    check('email','Email is required').isEmail(),
    check('password','Password required').not().isEmpty(),
    validateInputs
], authUser);

router.post('/google',[
    // check('id_token','Token the google is invalid').not().isEmpty(),
    check('id_token','Token the google is invalid').not().isEmpty().isJWT(),
    validateInputs
],authGoogle);



module.exports = router