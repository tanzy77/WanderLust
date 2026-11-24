const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");;
const { isLoggedIn, isOwner, validateListing } = require("../middleware");

//INDEX ROUTE
router.get("/", wrapAsync(async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
}));

//CREATE ROUTE
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new.ejs");
});

router.post("/", isLoggedIn, validateListing, wrapAsync(async (req, res, next) => {
  let newListing = new Listing(req.body.listing);
  console.log(req.user);
  newListing.owner = req.user._id;
  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
}));

//SHOW ROUTE
router.get("/:id", wrapAsync(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id).populate({
    path: "reviews", 
    populate: {
      path: "author",
    }
  }).populate("owner");
  if (!listing) {
    req.flash("error", "List already deleted!");
    return res.redirect("/listings");
  }
  console.log(listing);
  res.render("listings/show.ejs", { listing });
}));  

//EDIT ROUTE
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "List already deleted!");
    return res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing });
}));

//UPDATE ROUTE
router.put("/:id", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
  if (!req.body.listing) {
    throw new ExpressError(400, "Send valid data for listing");
  }
  const { id } = req.params;
  await Listing.findByIdAndUpdate(id, {...req.body.listing});
  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);

}));

//DELETE ROUTE
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
  const { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
}));

module.exports = router;