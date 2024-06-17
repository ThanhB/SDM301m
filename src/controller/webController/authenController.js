import bcrypt from "bcrypt";
import members from "../../models/members.js";
import mongoose from "mongoose";
import { signAccessToken } from "../../middleware/jwtAccessToken.js";

class AuthenController {
  static async signin(req, res) {
    return res.render("signin");
  }

  static async signinSuccess(req, res) {
    
  }
}

export default AuthenController;
