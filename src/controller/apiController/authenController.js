import bcrypt from "bcrypt";
import members from "../../models/members.js";

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
      if (req.member.isAdmin !== true) {
        return res.status(403).json({ message: "Unauthorized" });
      }
      const members = await members.find({});
      res.status(200).json({
        statusCode: 200,
        message: "get members successfully",
        data: members,
      });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "An error occurred while fetching the members" });
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
