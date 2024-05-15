const express = require('express');
const router = express.Router();
const { getHomePage, getABC, getThanhPage } = require('../controller/homeController');


//khai bao route
router.get('/', getHomePage)
router.get('/abc', getABC)
router.get('/thanh', getThanhPage)
  
module.exports = router;