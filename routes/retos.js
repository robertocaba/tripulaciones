const express = require('express');
const router = express.Router()
const RetoController = require('../controllers/RetoController');

router.post('/createReto ',RetoController.createReto);
router.put('/:_id', RetoController.update);
router.delete('/_id',RetoController.delete);
module.exports = router;
