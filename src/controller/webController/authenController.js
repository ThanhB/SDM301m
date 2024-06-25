import bcrypt from "bcrypt";
import members from "../../models/members.js";
import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken";

class AuthenController {
  static async signin(req, res) {
    return res.render("signin");
  }

  static async signinSuccess(req, res) {
    const { membername, password } = req.body;
    try {
      const check = await members.findOne({ membername });
      const isPasswordMatch = check ? await bcrypt.compare(password, check.password) : false;
      if (!check || !isPasswordMatch) {
        return res.render("signin", { error: "Invalid username or password" });
      }
      const key = process.env.ACCESS_TOKEN_SECRET;
      if (!key) {
        console.error("ACCESS_TOKEN_SECRET is not set.");
        return res.status(500).send("Internal server error");
      }
      const token = jsonwebtoken.sign(
        {
          memberId: check._id,
          membername: check.membername,
          isAdmin: check.isAdmin,
        },
        key,
        { expiresIn: "7d" }
      );
      res.cookie("token", token, { httpOnly: true });
      res.cookie("membername", check.membername, { httpOnly: true });
      res.cookie("memberId", check._id.toString(), { httpOnly: true });
      res.redirect("/");
      // Redirect to the appropriate page
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).send("Internal server error");
    }
  }

  static async signup(req, res) {
    return res.render("signup");
  }

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
      res.cookie("membername", member.membername, { httpOnly: true });
      res.cookie("memberId", member._id.toString(), { httpOnly: true });
      res.redirect("/");
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "An error occurred while registering the member" });
    }
  }

  static async logout(req, res) {
    res.clearCookie("token");
    res.clearCookie("membername");
    res.clearCookie("memberId");
    res.redirect("/");
  }
}

export default AuthenController;
