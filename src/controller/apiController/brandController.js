import brandSchema from "../../models/brand.js";

class BrandController {

  //get brands
  static async getBrands(req, res) {
    try {
      const brands = await brandSchema.find({}).select("-__v");
      res
        .status(200)
        .json({
          statusCode: 200,
          message: "get brand successfully",
          data: brands,
        });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "An error occurred while fetching the brands" });
    }
  }

  //create brand
  static async createBrand(req, res) {
    const { brandName } = req.body;

    if (!brandName || typeof brandName !== "string") {
      return res.status(400).json({ message: "Invalid input types" });
    }

    if (!brandName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      //check if brand already exists
      const existingBrand = await brandSchema.findOne({ brandName });
      if (existingBrand) {
        return res.status(400).json({ message: "Brand already exists" });
      }
      const brand = await brandSchema.create({ brandName });
      res
        .status(201)
        .json({
          statusCode: 201,
          message: "Brand created successfully",
          data: brand,
        });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "An error occurred while creating the brand" });
    }
  }

  //get brand by id 
  static async getBrandById(req, res) {
    const { id } = req.params;
    try {
      const brand = await brandSchema.findById(id).select("-__v");
      res
        .status(200)
        .json({
          statusCode: 200,
          message: "get brand by id successfully",
          data: brand,
        });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "An error occurred while fetching the brand" });
    }
  }

  //update brand
  static async editBrand(req, res) {
    const { brandName } = req.body;
    const { id } = req.params;

    try {
      const brand = await brandSchema.findById(id);
      if (!brand) {
        return res.status(404).json({ message: "Brand not found" });
      }

      brand.brandName = brandName;

      await brand.save();
      res
        .status(200)
        .json({
          statusCode: 200,
          message: "Brand updated successfully",
          data: brand,
        });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "An error occurred while updating the brand" });
    }
  }

  //delete brand
  static async deleteBrand(req, res) {
    const { id } = req.params;

    try {
      const brand = await brandSchema.findByIdAndDelete(id);
      res
        .status(200)
        .json({
          statusCode: 200,
          message: "Brand deleted successfully",
          data: brand,
        });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "An error occurred while deleting the brand" });
    }
  }
}

export default BrandController;
