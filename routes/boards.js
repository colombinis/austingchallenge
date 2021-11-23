const router = require('express').Router();
const controller = require('../controllers/boards');


router.post('/', controller.createItem)
router.put('/:id', controller.updateById)

module.exports = router;
