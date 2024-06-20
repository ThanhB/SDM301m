import Watch from "../../models/watcheschema.js";
import Brand from "../../models/brand.js";
import members from "../../models/members.js";
import jwt from "jsonwebtoken";
import express from "express";
class WatchController {
  //get all watch
  static async getwatch(req, res) {
    const membername = req.cookies.membername;
    const { search, brand, page = 1, limit = 9 } = req.query;
    const filter = {};
    if (search) {
      filter.watchName = { $regex: search, $options: "i" };
    }
    if (brand) {
      filter.brand = brand;
    }
    let isAdmin = false;
    const token = req.cookies.token;
    if (token) {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      isAdmin = decoded.isAdmin;
    }

    const formatPrice = (price) => {
      const decimalPart = price - Math.floor(price);
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: decimalPart > 0 ? 2 : 0,
      }).format(price);
    };

    try {
      const totalWatches = await Watch.countDocuments(filter);
      const totalPages = Math.ceil(totalWatches / limit);

      let watches = await Watch.find(filter)
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("brand");
      watches = watches.map((watch) => {
        watch.formattedPrice = formatPrice(watch.price);
        return watch;
      });

      const brands = await Brand.find();
      res.render("Home", {
        watches,
        brands,
        search,
        selectedBrand: brand,
        membername,
        isAdmin: isAdmin,
        page: Number(page),
        pages: totalPages, // pass the total pages to the template
      });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "An error occurred while fetching the watches" });
    }
  }

  //get watch by id
  static async getwatchById(req, res) {}
}

export default WatchController;
