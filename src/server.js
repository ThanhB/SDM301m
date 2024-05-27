require('dotenv').config();
const express = require('express' );
const configVewEngine = require('./config/viewEngine');
const app = express();
const path = require('path');
const webRoute = require('./routes/web');
const dbConnection = require('./db/db');
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

// Connect to the database and start the server
dbConnection().then(() => {
  app.listen(port, hostname ,() => {
    console.log(`sever run at http://${hostname}:${port}`)
  });
}).catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
});