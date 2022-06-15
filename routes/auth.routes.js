const { Router } = require('express');
const { check } = require('express-validator')

const { authUser } = require('../controller/auth.controller');
const { validateInputs } = require('../middlewares/validators/validate.input');

const router = Router();


router.post('/login', [
    check('email','Email is required').isEmail(),
    check('password','Password required').not().isEmpty(),
    validateInputs
], authUser);



module.exports = router