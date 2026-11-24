const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const Review = require("../models/review");
const Listing = require("../models/listing");
const { isLoggedIn, validateReview, isReviewAuthor } = require("../middleware");

//POST ROUTE
router.post("/", isLoggedIn, validateReview, wrapAsync(async(req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);

  newReview.author = req.user._id;
  listing.reviews.push(newReview);

  console.log(newReview);
  await newReview.save();
  await listing.save();

  req.flash("success", "New Review Created");
  res.redirect(`/listings/${listing._id}`);
}));

//DELETE ROUTE
router.delete("/:reviewId", isReviewAuthor, isLoggedIn, wrapAsync(async(req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
  await Review.findByIdAndDelete(reviewId);

  req.flash("success", "Review Deleted");
  res.redirect(`/listings/${id}`);
}));

module.exports = router;
