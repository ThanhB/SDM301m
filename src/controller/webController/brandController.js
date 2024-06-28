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
        query: req.query,
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
      const watchExists = await Watch.findOne({ brand: id });

      if (watchExists) {
        // Redirect with error message
        return res.redirect(
          `/admin/brands?error=Cannot delete brand as it has associated watches.`
        );
      }

      await Brand.findByIdAndDelete(id);
      // Redirect with success message
      res.redirect("/admin/brands?message=Brand successfully deleted.");
    } catch (error) {
      console.error("Error deleting brand:", error);
      // Redirect with server error message
      res.redirect("/admin/brands?error=Server error");
    }
  }

  static async createBrandPage(req, res) {
    const membername = req.cookies.membername;
    res.render("brandsCreate", { membername });
  }

  static async createBrand(req, res) {
    let { brandName } = req.body;

    if (brandName) {
      brandName = brandName.trim();
    }

    if (!brandName || typeof brandName !== "string") {
      return res.redirect("/admin/brands?error=Invalid input type.");
    }

    try {
      // Adjusted to use a case-insensitive search
      const existingBrand = await Brand.findOne({
        brandName: new RegExp("^" + brandName + "$", "i"),
      });
      if (existingBrand) {
        return res.redirect("/admin/brands?error=Brand already existed.");
      }
      const newBrand = await Brand({ brandName }); // Ensure brandName is normalized as needed
      await newBrand.save();
      res.redirect("/admin/brands?message=Brand created successfully.");
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  }
}

export default BrandController;
