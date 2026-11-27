const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, validateReview, isReviewAuthor } = require("../middleware");

const reviewController = require("../controllers/reviews");

//POST ROUTE
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.postReview));

//DELETE ROUTE
router.delete("/:reviewId", isReviewAuthor, isLoggedIn, wrapAsync(reviewController.destroyReview));

module.exports = router;
