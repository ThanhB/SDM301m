import Brand from "../../models/brand.js";
import jwt from "jsonwebtoken";
import Watch from "../../models/watcheschema.js";
class BrandController {
  static async brandPage(req, res) {
    const membername = req.cookies.membername || "Guest";
    try {
      const brands = await Brand.find(); // Assuming you're fetching members to display

      res.render("adminBrandPage", {
        membername,
        brands,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to load dashboard", error });
    }
  }

  static async brandEdit(req, res) {
    const membername = req.cookies.membername;
    const brands = await Brand.findById(req.params.id);
    res.render("editBrand", { brands, membername });
  }

  static async updateBrand(req, res) {
    const { id } = req.params;
    const { brandName } = req.body;
    try {
      const updatedBrand = await Brand.findByIdAndUpdate(
        id,
        { brandName },
        { new: true }
      );

      res.redirect("/admin/brands");
    } catch (error) {
      console.error("Error updating brand:", error);
      res.status(500).json({ error: "Server error" });
    }
  }

  static async deleteBrand(req, res) {
    try {
      const { id } = req.params;
      // Assuming there's a Watch model with a reference to Brand by brandId
      const watchExists = await Watch.findOne({ brand: id });

      if (watchExists) {
        // If a watch associated with the brand exists, do not delete and show an error message
        return res
          .status(400)
          .json({ error: "Cannot delete brand as it has associated watches." });
      }

      await Brand.findByIdAndDelete(id);
      res.redirect("/admin/brands");
    } catch (error) {
      console.error("Error deleting brand:", error);
      res.status(500).send({ error: "Server error" });
    }
  }

  static async createBrandPage(req, res) {
    const membername = req.cookies.membername;
    res.render("brandsCreate", { membername });
  }

  static async createBrand(req, res) {
    const { brandName } = req.body;

    if (!brandName || typeof brandName !== "string") {
      return res.status(400).send({ message: "Invalid input types" });
    }
    if (!brandName) {
      return res.status(400).send({ message: "All fields are required" });
    }
    try {
      const existingBrand = await Brand.findOne({ brandName });
      if (existingBrand) {
        return res.status(400).send({ message: "Brand already exists" });
      }
      const newBrand = await Brand({ brandName });
      await newBrand.save();
      res.redirect("/admin/brands");
    } catch (error) {
      res.status(500).send({ error: err.message });
    }
  }
}

export default BrandController;
