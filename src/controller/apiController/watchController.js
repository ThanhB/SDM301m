import Watch from "../../models/watcheschema.js";
import brandSchema from "../../models/brand.js";
import mongoose, { Types } from "mongoose";
class WatchController {
  static async getWatches(req, res) {
    try {
      const data = await Watch.find({});
      res.status(200).json({
        statusCode: 200,
        message: "get watch successfully",
        data: data,
      });
      console.log("get watch successfully");
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "An error occurred while fetching the watches" });
    }
  }

  static async createWatch(req, res) {
    const {
      watchName,
      image,
      price,
      Automatic,
      watchDescription,
      comments,
      brand,
    } = req.body;

    // ...existing validation code...
    if (
      !watchName ||
      typeof watchName !== "string" ||
      !image ||
      typeof image !== "string" ||
      price === undefined ||
      typeof price !== "number" ||
      Automatic === undefined ||
      typeof Automatic !== "boolean" ||
      !watchDescription ||
      typeof watchDescription !== "string"
    ) {
      return res.status(400).json({ message: "Invalid input types" });
    }
    if (!watchName || !image || !price || !watchDescription || !brand) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(brand)) {
      return res.status(400).json({ message: "Invalid brand id" });
    }

    const brandDoc = await brandSchema.findById(
      new mongoose.Types.ObjectId(brand)
    );
    if (!brandDoc) {
      console.log("abc");
      return res.status(400).json({ message: "Brand not found" });
    }
    try {
      // Check if the watch exists
      // const existingWatch = await Watch.findOne({ watchName });
      // if (existingWatch) {
      //   return res.status(400).json({ message: "Watch already exists" });
      // }

      // Fetch the brand document from the Brands collection

      // If the brand doesn't exist, return an error

      // Use the ObjectId of the brand document
      const brandId = brandDoc._id;

      const watch = await Watch.create({
        watchName,
        image,
        price,
        Automatic,
        watchDescription,
        comments,
        brand: new mongoose.Types.ObjectId(brandId), // Use the brandId here
      });

      res.status(201).json({ message: "Watch added successfully" });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "An error occurred while creating the watch" });
    }
  }

  //get watch by id
  static async getWatchById(req, res) {
    const { id } = req.params;
    try {
      const watch = await Watch.findById(id);
      if (!watch) {
        return res.status(404).json({ message: "Watch not found" });
      }
      res.status(200).json({
        statusCode: 200,
        message: "get watch successfully",
        data: watch,
      });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "An error occurred while fetching the watches" });
    }
  }

  //update watch by id
}

export default WatchController;
