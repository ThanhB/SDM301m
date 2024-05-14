require('dotenv').config();
const express = require('express' );
const configVewEngine = require('./config/viewEngine');
const app = express();
const path = require('path');
const webRoute = require('./routes/web');

//config port
const port = process.env.PORT || 8888 ;
const hostname= process.env.HOST_NAME;

//config template engine
configVewEngine(app);
console.log("check env", process.env.PORT + " " + process.env.HOST_NAME)

//khai bao route
app.use('/', webRoute);


app.listen(port, hostname ,() => {
  console.log(`sever run at http://${hostname}:${port}`)
})
