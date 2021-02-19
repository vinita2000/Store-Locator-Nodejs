const express = require('express');
const {getStores, addStore} = require('../controllers/stores');
const router = new express.Router();

router.route('/api/v1/stores').get(getStores).post(addStore);

module.exports = router;
