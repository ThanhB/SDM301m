import bcrypt from "bcrypt";
import members from "../../models/members.js";
import mongoose from "mongoose";
class MemberController {
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
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ statusCode: 400, message: "Invalid id" });
    }
    try {
      const member = await members.findById(id);
      res.status(200).json({
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
    const { membername, password, name, YOB } = req.body;
    const { id } = req.params;

    //kiem tra co phai la nguoi dung hien tai khong
    if (req.user.id !== id) {
      return res
        .status(403)
        .json({ message: "You can only edit your own information" });
    }

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

export default MemberController;
