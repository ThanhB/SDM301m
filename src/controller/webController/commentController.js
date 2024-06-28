import commentSchema from "../../models/comment.js";
import members from "../../models/members.js";
import watches from "../../models/watcheschema.js";
import mongoose from "mongoose";


class commentController {
  //add a comment to a watch
  static async createComment(req, res) {
    const { id } = req.params;
    const { comment, rating } = req.body;
    const author = req.cookies.memberId; // Assuming memberId is stored in cookies
  
    try {
      const watch = await watches.findById(id);
      if (!watch) {
        return res.status(404).json({ message: "Watch not found" });
      }
  
      // Kiểm tra xem thành viên đã đăng bình luận cho đồng hồ này chưa
      const existingComment = watch.comments.find(
        (comment) => comment.author.toString() === member._id.toString()
      );
      if (existingComment) {
        return res
          .status(400)
          .json({ message: "Member has already commented on this watch" });
      }
  
      const newComment = new {
        content: comment,
        rating,
        author, 
      };
  
      await newComment.save();
      watch.comments.push(newComment);
      await watch.save();
  
      res.redirect(`/watch/${id}`);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}
}
export default commentController;
