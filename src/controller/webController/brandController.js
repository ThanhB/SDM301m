import Brand from "../../models/brand.js";
import jwt from "jsonwebtoken";
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


}

export default BrandController;
