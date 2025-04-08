const express = require('express');
const router = express.Router();
const { createClient, getClients, updateClient } = require('../controllers/clientController');
const { deleteClient } = require('../controllers/clientController');

router.post('/', createClient);
router.get('/', getClients);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

module.exports = router;