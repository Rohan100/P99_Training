const express = require('express');
const { getAllPortData, getPortDataById, deletePortDataById, createPortData } = require('../controllers/portControllers');
const router = express.Router();

router.get('/', getAllPortData)

router.get('/:id', getPortDataById)

router.delete('/:id', deletePortDataById)

router.post('/', createPortData)


module.exports = router;