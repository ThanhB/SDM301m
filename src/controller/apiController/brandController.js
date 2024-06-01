import brandSchema from "../../models/brandschema.js";

class BrandController {
  static async getBrands(req, res) {
    try {
      const brands = await brandSchema.find({});
      res.status(200).json(brands);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred while fetching the brands" });
    }
  }
}

export default BrandController;