const { Router } = require('express');
const { search } = require('../controller/search.controller');

const router = Router();

router.get('/:collection/:terms',[],search)

module.exports = router;