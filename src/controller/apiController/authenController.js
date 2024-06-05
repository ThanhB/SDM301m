import bcrypt from "bcrypt";
import members from "../../models/members.js";
import mongoose from "mongoose";
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
        data: member,
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

      res.status(200).json({
        statusCode: 200,
        message: "Logged in successfully",
        data: member,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred while logging in" });
    }
  }

}

export default AuthenController;
