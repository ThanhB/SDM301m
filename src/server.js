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

//khai bao route
app.use('/', webRoute);

// handle 404 - keep this as your last route
app.use(function(req, res, next) {
  res.status(404).render('404.ejs');
});

app.listen(port, hostname ,() => {
  console.log(`sever run at http://${hostname}:${port}`)
})
