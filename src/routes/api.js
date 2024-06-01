import express from "express";
import brandSchema from "../models/brand.js";
import Watch from "../models/watcheschema.js";
const router = express.Router();

/**
 * @swagger
 * /api/watch:
 *   get:
 *     summary: Retrieve a list of watches
 *     responses:
 *       200:
 *         description: A list of watches.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       watchName:
 *                         type: string
 *                       image:
 *                         type: string
 *                       price:
 *                         type: number
 *                       Automatic:
 *                         type: boolean
 *                       watchDescription:
 *                         type: string
 *                       comments:
 *                         type: array
 *                         items:
 *                           type: string
 *                       brand:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                       __v:
 *                         type: integer
 */
//GET all watches
router.get("/api/watch", async (req, res) => {
  try {
    const data = await Watch.find({});
    res
      .status(200)
      .json({ statusCode: 200, message: "get watch successfully", data: data });
    console.log("get watch successfully");
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the watches" });
  }
});

//create new watch
router.post("/api/create-watch", async (req, res) => {
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
    typeof watchDescription !== "string" ||
    !brand ||
    typeof brand !== "string"
  ) {
    return res.status(400).json({ message: "Invalid input types" });
  }
  if (!watchName || !image || !price || !watchDescription || !brand) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    // Fetch the brand document from the Brands collection
    const brandDoc = await brandSchema.findOne({ brandName: brand });

    // If the brand doesn't exist, return an error
    if (!brandDoc) {
      return res.status(400).json({ message: "Brand not found" });
    }

    // Use the ObjectId of the brand document
    const brandId = brandDoc._id;

    const watch = await Watch.create({
      watchName,
      image,
      price,
      Automatic,
      watchDescription,
      comments,
      brand: brandId, // Use the brandId here
    });

    res.status(201).json({ message: "Watch added successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while creating the watch" });
  }
});
export default router;
