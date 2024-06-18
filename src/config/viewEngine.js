import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const configVewEngine = (app) => {
  app.use(express.static("uploads"));
  app.use(express.static(path.join(__dirname, '../public'))); // Add this line
  app.set("view engine", "ejs");
  app.set("views", [
    path.resolve(__dirname, "../views"),
    path.resolve(__dirname, "../views/authen"),
    path.resolve(__dirname, "../views/admin")
  ]); 
}

export default configVewEngine;