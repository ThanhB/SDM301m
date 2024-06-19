import Watch from "../../models/watcheschema.js";
import Brand from "../../models/brand.js";
import members from "../../models/members.js";

class WatchController {

  //
  static async getwatch(req, res) {
    const membername = req.cookies.membername || "Guest";
    const { query, brand } = req.query;
    const fitler = {};
    if (query) {
      fitler.watchName = { $regex: query, $options: "i" };
    }
    if (brand) {
      fitler.brand = brand;
    }

    try {
      const watches = await Watch.find(fitler).populate("brand"); // Đảm bảo rằng bạn populate để lấy thông tin brand
      const brands = await Brand.find(); // Lấy danh sách các nhãn hiệu (brand)
      res.render("Home", {
        watches,
        brands,
        query,
        selectedBrand: brand,
        membername,
      });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "An error occurred while fetching the watches" });
    }
  }
}

export default WatchController;
