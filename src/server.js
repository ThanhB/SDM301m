const express = require('express' );
require('dotenv').config();
const app = express();
const path = require('path');


//config port
const port = process.env.PORT || 8888 ;
const hostname= process.env.HOST_NAME;

//config template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
console.log("check env", process.env.PORT + " " + process.env.HOST_NAME)

//config static file
app.use(express.static(path.join(__dirname, 'public')));

//khai bao route
app.get('/', (req, res) => {
  res.send('Hello World! 1234')
})

app.get('/abc', (req, res) => {
  res.send('check ABC')
})
app.get('/thanh', (req, res) => {
 res.render('sample.ejs');
})

app.listen(port, hostname ,() => {
  console.log(`sever run at http://${hostname}:${port}`)
})
