const mongoose = require("mongoose");
const Review = require("./review");


const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    filename: {
      type: String,
      default: "listingImage",
    },
    url: {
      type: String,
      default: "https://www.flaticon.com/free-icon/default-image_12048902",
      set: (v) => v === "" ? ("https://www.flaticon.com/free-icon/default-image_12048902") : v,
    }
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review"
    }  
  ]
});

listingSchema.post("findOneAndDelete", async(listing) => {
  if (listing) {
    await Review.deleteMany({_id: {$in: listing.reviews }});
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;