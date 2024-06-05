import jsonwebtoken from "jsonwebtoken";
import createHttpError from "http-errors";
import dotenv from "dotenv";
import { token } from "morgan";
dotenv.config();

export function verifyToken(token) {
  const key = process.env.ACCESS_TOKEN_SECRET;
  let data = null;
  try {
    const decoded = jsonwebtoken.verify(token, key);
    data = decoded;
  } catch (err) {
    // Log the error or handle it as needed
    console.log(err);
    // Return null to indicate token verification failure
    return null;
  }
  return data;
}

export function signAccessToken(id) {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: "30m",
      issuer: "localhost",
      audience: id,
    };
    jsonwebtoken.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.error(err.message);
        reject(createHttpError.InternalServerError());
      }
      resolve(token);
    });
  });
}

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);
  jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
