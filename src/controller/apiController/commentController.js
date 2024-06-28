import commentSchema from "../../models/comment.js";
import members from "../../models/members.js";
import watches from "../../models/watcheschema.js";
import mongoose from "mongoose";

const Comment = mongoose.model("Comment", commentSchema);
class commentController {
  // Add a comment to a watch
  static async createComment(req, res) {
    const id = req.params.id;
    const userid = req.user.aud;

    if (!req.body.rating || !req.body.text) {
      return res
        .status(400)
        .json({ message: "Rating and content are required" });
    }
    try {
      const member = await members.findById(userid);
      //check if the member is an admin
      if (member.isAdmin === true) {
        return res
          .status(403)
          .json({ message: "Admin can't leave a feedback" });
      }
      //check if memeber is exist
      if (!member) {
        return res.status(404).json({ message: "Member not found" });
      }

      const watch = await watches.findById(id);
      //check if watch is exist
      if (!watch) {
        return res.status(404).json({ message: "Watch not found" });
      }

      // Check if the member has already commented on this watch
      const existingComment = watch.comments.find(
        (comment) => comment.author.toString() === member._id.toString()
      );
      if (existingComment) {
        return res
          .status(400)
          .json({ message: "Member has already commented on this watch" });
      }

      // Construct the comment object
      const comment = {
        rating: req.body.rating,
        content: req.body.text,
        author: member._id,
      };

      // Add the comment to the watch's comments
      watch.comments.push(comment);
      await watch.save();

      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default commentController;
