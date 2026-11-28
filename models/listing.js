const mongoose = require("mongoose");
const Review = require("./review");
const categories = require("../init/categories");

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
      default: "https://images.trvl-media.com/lodging/17000000/16280000/16272400/16272320/w4000h3489x0y11-2a341699.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
      set: (v) => v === "" ? ("https://images.trvl-media.com/lodging/17000000/16280000/16272400/16272320/w4000h3489x0y11-2a341699.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill") : v,
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
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  category: {
    type: String,
    enum: categories.map(category => category.name),
    required: true
  }
});

listingSchema.post("findOneAndDelete", async(listing) => {
  if (listing) {
    await Review.deleteMany({_id: {$in: listing.reviews }});
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;