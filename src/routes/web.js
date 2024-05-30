const express = require('express');
const router = express.Router();
const { getHomePage, getABC } = require('../controller/homeController');


//public route
router.get('/', getHomePage)
router.get('/abc', getABC)

//private route
router.use(authen)


function authen(req, res, next){
    console.log("Check authen")
    next()
}

module.exports = router;