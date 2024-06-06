import bcrypt from "bcrypt";
import members from "../../models/members.js";
import jwt from "jsonwebtoken";
import {
  signAccessToken,
  verifyToken,
} from "../../middleware/jwtAccessToken.js";

class AuthenController {
  //register member
  static async register(req, res) {
    const { membername, password, name, YOB, isAdmin } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const member = await members.create({
        membername,
        password: hashedPassword,
        name,
        YOB,
        isAdmin: isAdmin === "false",
      });
      res.status(201).json({
        statusCode: 201,
        message: "Member registered successfully",
      });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "An error occurred while registering the member" });
    }
  }

  //login member
  static async login(req, res) {
    const { membername, password } = req.body;

    try {
      const member = await members.findOne({ membername });
      if (!member) {
        return res
          .status(400)
          .json({ message: "Invalid username or password" });
      }

      const validPassword = await bcrypt.compare(password, member.password);
      if (!validPassword) {
        return res
          .status(400)
          .json({ message: "Invalid username or password" });
      }

      const token = await signAccessToken(member._id.toString());
      res.setHeader("Authorization", "Bearer " + token);
      res.status(200).json({
        statusCode: 200,
        message: "Logged in successfully",
        accessToken: "Bearer " + token,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred while logging in" });
    }
  }

  //logout member
  static async logout(req, res) {
    try {
      // Invalidate the token on client side
      res.status(200).json({
        statusCode: 200,
        message: "Logged out successfully",
        Authorization: null,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred while logging out" });
    }
  }

  // Get user info
static async getUserInfo(req, res) {
  const { id } = req.user;

  try {
    const member = await members.findById(id).select('-password -__v');
    if (!member) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      statusCode: 200,
      message: "User information retrieved successfully",
      data: member,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while retrieving user information" });
  }
}
}



export default AuthenController;
