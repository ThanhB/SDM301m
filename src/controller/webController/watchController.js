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
  static async getwatchById(req, res) {
    const memberId = req.cookies.memberId;
    const membername = req.cookies.membername;
    const token = req.cookies.token; // Assuming the JWT token is stored in a cookie named 'token'

    let isAdmin = false;
    if (token) {
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // Replace 'your-secret-key' with the secret key used when the token was signed
      isAdmin = decodedToken.isAdmin;
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
      const { id } = req.params;
      let watch = await Watch.findById(id)
        .populate({
          path: "comments",
          populate: { path: "author", select: "membername" },
        })
        .populate("brand");

      if (!watch) {
        return res.render("404", { membername, isAdmin });
      }

      watch.formattedPrice = formatPrice(watch.price);

      res.render("detailWatches", {
        watches: watch,
        membername,
        memberId,
        isAdmin,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  //admin home page
  static async homePageAdmin(req, res) {
    const membername = req.cookies.membername || "Guest";
    res.render("watchesCreate", { membername });
  }
  //create watch page
  static async createwatchPage(req, res) {
    const membername = req.cookies.membername || "Guest";
    const brands = await Brand.find();
    res.render("watchesCreate", { membername, brands });
  }

  //create watch
  static async createwatch(req, res) {
    try {
      const { watchName, image, price, watchDescription, comments, brand } = req.body;
      const Automatic = req.body.Automatic === "on";

      if (!watchName || !image || !price || !watchDescription || !brand) {
        // Redirect with error message for missing fields
        return res.redirect("/admin/watches/create?error=Please provide all required fields");
      }

      const brandExists = await Brand.findById(brand);
      if (!brandExists) {
        // Redirect with error message for invalid brand ID
        return res.redirect("/admin/watches/create?error=Invalid brand ID");
      }

      const newWatch = new Watch({
        watchName,
        image,
        price,
        Automatic,
        watchDescription,
        comments,
        brand,
      });

      await newWatch.save();

      // Redirect with success message
      res.redirect("/admin/watches?message=Watch successfully created");
    } catch (error) {
      console.error("Error creating watch:", error);
      // Redirect with server error message
      res.redirect("/admin/watches/create?error=Server error");
    }
}
  //delete watch
  static async deletewatch(req, res) {
    try {
      const { id } = req.params;
      await Watch.findByIdAndDelete(id);
      // Redirect with a success message
      res.redirect("/admin/watches?message=Watch deleted successfully");
    } catch (error) {
      console.error("Error deleting watch:", error);
      // Redirect with an error message
      res.redirect("/admin/watches?error=Server error");
    }
  }

  //edit watch
  static async editwatch(req, res) {
    const membername = req.cookies.membername || "Guest";
    const watch = await Watch.findById(req.params.id);
    const brands = await Brand.find();
    res.render("editWatches", { watch,brands, membername });
  }

  //update watch
  static async updateWatch(req, res) {
    try {
      const { id } = req.params;
      const existingWatch = await Watch.findById(id);
  
      if (!existingWatch) {
        return res.status(404).json({ error: "Watch not found" });
      }
  
      const fieldsToUpdate = ['watchName', 'image', 'price', 'watchDescription', 'comments', 'brand'];
      const Automatic = req.body.Automatic === "on";
      let updatedFields = {};
  
      fieldsToUpdate.forEach(field => {
        if (req.body[field] && req.body[field] !== existingWatch[field]) {
          updatedFields[field] = req.body[field];
        }
      });
  
      if (req.body.Automatic !== undefined && Automatic !== existingWatch.Automatic) {
        updatedFields.Automatic = Automatic;
      }
  
      if (Object.keys(updatedFields).length > 0) {
        await Watch.findByIdAndUpdate(id, updatedFields);
        res.redirect("/admin/watches?message=Watch updated successfully");
      } else {
        res.redirect("/admin/watches?message=No changes made");
      }
    } catch (error) {
      console.error("Error updating watch:", error);
      res.redirect("/admin/watches?error=Server error");
    }
  }

  //admin watch page
  static async watchPage(req, res) {
    const membername = req.cookies.membername || "Guest";
    try {
      const watch = await Watch.find(); 
      const brands  = await Brand.find();
      res.render("adminWatchPage", {
        membername,
        watch,
        brands,
        query: req.query,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to load dashboard", error });
    }
  }
}

export default WatchController;
