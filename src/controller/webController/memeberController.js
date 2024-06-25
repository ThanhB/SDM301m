import bcrypt from "bcrypt";
import members from "../../models/members.js";
import jwt from "jsonwebtoken";
import flash from "connect-flash";
class memberController {
  //get all memember
  static async getMember(req, res) {
    try {
      const member = await members.find();
      res.render("member", { member });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }

  //get member by id
  static async getMemberById(req, res) {
    const membername = req.cookies.membername;
    let isAdmin = false;

    if (!membername) {
      return res.render("memberProfile", {
        member: null,
        isAdmin,
        membername: "Guest",
      });
    }

    const token = req.cookies.token;
    if (token) {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      isAdmin = decoded.isAdmin;
    }
    try {
      const member = await members.findOne({ membername });

      if (!member) {
        return res.render("memberProfile", {
          member: null,
          isAdmin: isAdmin,
          membername, // Pass membername here
        });
      }

      res.render("memberProfile", { member, isAdmin, membername }); // Include membername here as well
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }

  static async editMember(req, res) {
    const membername = req.cookies.membername;
    let isAdmin = false;
    const token = req.cookies.token;
    if (token) {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      isAdmin = decoded.isAdmin;
    }

    if (!membername) {
      return res.render("editProfile", { member: null, membername: "Guest" });
    }

    try {
      const member = await members.findOne({ membername });

      if (!member) {
        return res.render("editProfile", { member: null, membername: "Guest" });
      }

      res.render("editProfile", { member, membername, isAdmin: isAdmin });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }

  static async updateMember(req, res) {
    const membername = req.cookies.membername;

    if (!membername) {
      return res.status(403).send("Unauthorized");
    }

    const { name, YOB, isAdmin } = req.body;

    try {
      const member = await members.findOneAndUpdate(
        { membername },
        { name, YOB, isAdmin },
        { new: true }
      );

      if (!member) {
        return res.status(404).send("Member not found");
      }

      res.redirect("/userprofile");
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }

  static async chagePassword(req, res) {
    const membername = req.cookies.membername;

    if (!membername) {
      return res.status(403).send("Unauthorized");
    }

    const { currentPassword, newPassword } = req.body;

    try {
      const member = await members.findOne({ membername });

      if (!member) {
        return res.status(404).send("Member not found");
      }

      // Compare current password
      const isMatch = await bcrypt.compare(currentPassword, member.password);

      if (!isMatch) {
        return res.status(400).send("Current password is incorrect");
      }

      // Check if the new password is the same as the current password
      if (currentPassword === newPassword) {
        return res
          .status(400)
          .send("New password must be different from the current password");
      }

      // Hash new password before saving
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      member.password = hashedPassword;
      await member.save();
      res.redirect("/userprofile");
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }
}

export default memberController;
