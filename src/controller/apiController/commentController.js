import commentSchema from "../../models/comment.js";
import members from "../../models/members.js";
import watches from "../../models/watcheschema.js";
class commentController {
  //get all comments

  //add comment
  static async createComment(req, res) {
    const { rating, content, authorId, watchId } = req.body;
    
    try {
      // kiem tra xem nguoi dung co ton tai khong
      const author = await members.findById(authorId);
      if (!author) {
        return res.status(404).json({ message: "Author not found" });
      }
      //kiem tra xem watch co ton tai khong
      const watch = await watches.findById(watchId);
      if (!watch) {
        return res.status(404).json({ message: "Watch not found" });
      }
      // kiem tra neu nguoi dung da comment roi
      const existingComment = await commentSchema.findOne({ author, watchId });
      if (existingComment) {
        return res
          .status(400)
          .json({ message: "You have already commented on this watch" });
      }

      //tao comment moi
      const newComment = new commentSchema({
        rating,
        content,
        author: authorId,
      });
      res
        .status(201)
        .json({ message: "Comment created successfully", data: newComment });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "An error occurred while creating the comment" });
    }
  }
}

export default commentController;
