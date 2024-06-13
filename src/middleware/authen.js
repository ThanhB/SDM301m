import jwt from "jsonwebtoken";
import members from "../models/members.js";

export const isAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Bearer <token>
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
      const id = user.aud;
      if (err) {
        console.log("JWT verification error:", err);
        return res.sendStatus(403);
      }
      // Fetch the member from the database
      const member = await members.findById(id);
      if (!member) {
        console.log("User not found in database");
        return res.sendStatus(404);
      }

      req.user = member;
      if (member.isAdmin === true) {
        next(); // pass the control to the next handler
      } else {
        console.log("User is not an admin");
        res.status(403).json({
          message: "Forbidden: You do not have access to this resource",
        });
      }
    });
  } else {
    console.log("No authorization header");
    res.sendStatus(401);
  }
};
