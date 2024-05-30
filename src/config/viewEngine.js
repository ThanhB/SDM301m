import path from 'path';
import express from 'express';

const configVewEngine = (app) => {
  //config template engine
  app.set('views', path.join('./src', 'views'));
  app.set('view engine', 'ejs');
  //config static file
  app.use(express.static(path.join('./src', 'public')));
}

export default configVewEngine;