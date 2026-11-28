const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const listingController = require("../controllers/listings");
const multer  = require('multer')
const {storage} = require("../cloudConfig");
const Listing = require("../models/listing");
const upload = multer({ storage })
const categories = require("../init/categories");

router.get("/", wrapAsync(async(req, res) => {
  let { category } = req.query;

  let filter = {};
  if (category) {
    filter.category = category;
  }

  const allListings = await Listing.find(filter);

  res.render("listings/index", { allListings, categories });
}))

router.route("/")
  .get(wrapAsync(listingController.indexListing))
  .post(
    isLoggedIn,
    upload.single("listing[image][url]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

//CREATE ROUTE
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn, 
    isOwner, 
    upload.single("listing[image][url]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, 
    isOwner, 
    wrapAsync(listingController.destroyListing)
  );

//EDIT ROUTE
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListing));

module.exports = router;