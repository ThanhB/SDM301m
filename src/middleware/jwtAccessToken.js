import jsonwebtoken from "jsonwebtoken";
import createHttpError from "http-errors";
import dotenv from "dotenv";
import members from "../models/members.js";
dotenv.config();

//api
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
      expiresIn: "7d",
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

export const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid authorization header" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = await members.findById(decoded.aud);
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid token" });
  }
};





//web
export function checkTokenExpirationMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return next();
  }

  try {
    const decoded = jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (decoded.exp < Date.now() / 1000) {
      res.clearCookie("token");
      res.clearCookie("membername");
      res.clearCookie("memberId");
      return res.redirect("/");
    }
    next();
  } catch (err) {
    console.error(err);
    res.clearCookie("token");
    res.clearCookie("membername");
    res.clearCookie("memberId");
    return res.redirect("/");
  }
}

export function webAuthenticateToken(req, res, next) {
  const token = req.cookies.token; // Lấy token từ cookie
  if (!token) {
    return res.status(401).send("Unauthorized"); // Không có token, trả về lỗi Unauthorized
  }
  try {
    const decoded = jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET); // Xác thực token
    req.user = decoded; // Lưu thông tin user vào req để sử dụng trong các xử lý tiếp theo
    next(); // Chuyển tiếp yêu cầu đến middleware hoặc route tiếp theo
  } catch (error) {
    return res.status(403).send("Invalid token"); // Token không hợp lệ, trả về lỗi Forbidden
  }
}

export function isAdminWeb(req, res, next) {
  if (req.user && req.user.isAdmin) {
    next(); // Người dùng là admin, cho phép tiếp tục
  } else {
    res.status(403).send("Access denied. Admins only."); // Người dùng không phải là admin, từ chối truy cập
  }
}
