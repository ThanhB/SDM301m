const express = require('express');
const router = express.Router();

//khai bao route
router.get('/', (req, res) => {
    res.send('Hello World! 1234')
  })
  
  router.get('/abc', (req, res) => {
    res.send('check ABC')
  })
  router.get('/thanh', (req, res) => {
   res.render('sample.ejs');
  })
  
  module.exports = router;