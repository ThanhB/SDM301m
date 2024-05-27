const express = require('express');
const router = express.Router();
const { getHomePage, getABC } = require('../controller/homeController');


//khai bao route
router.get('/', getHomePage)
router.get('/abc', getABC)

module.exports = router;