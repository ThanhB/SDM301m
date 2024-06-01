import Watch from "../../models/watcheschema.js";

class WatchController {
    
  static async getWatches(req, res) {
    try {
      const data = await Watch.find({});
      res.status(200).json({ statusCode: 200, message: "get watch successfully", data: data });
      console.log("get watch successfully");
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred while fetching the watches" });
    }
  }
}

export default WatchController;