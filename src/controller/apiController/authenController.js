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

  //get all members
  static async getMembers(req, res) {
    try {
      // if (req.member.isAdmin !== true) {
      //   return res.status(403).json({ message: "Unauthorized" });
      // }
      const membersList = await members.find({ isAdmin: false });
      res.status(200).json({
        statusCode: 200,
        message: "get members successfully",
        data: membersList,
      });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "An error occurred while fetching the members" });
    }
  }

  //get member detail by id
  static async getMemberById(req, res) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)){
      return res
        .status(400)
        .json({ statusCode: 400, message: "Invalid id" });
    }
    try {
      const member = await members.findById(id);
        res
          .status(200)
          .json({
            statusCode: 200,
            message: "get member successfully",
            data: member,
          });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "An error occurred while fetching the member" });
    }
  }

  //edit member
  static async editMember(req, res) {
    const { membername, password, name, YOB, isAdmin } = req.body;
    const { id } = req.params;

    try {
      const member = await members.findById(id);
      if (!member) {
        return res.status(404).json({ message: "Member not found" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      member.membername = membername;
      member.password = hashedPassword;
      member.name = name;
      member.YOB = YOB;
      member.isAdmin = isAdmin;

      await member.save();
      res.status(200).json({
        statusCode: 200,
        message: "Member edited successfully",
        data: member,
      });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "An error occurred while editing the member" });
    }
  }
}

export default AuthenController;
