const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodoverride = require("method-override");
const Listing = require("./models/listing");
const ejsMate = require("ejs-mate");

main().then(() => {
  console.log("Connected with DB");
}).catch((err) => {
  console.log(err);
});

async function main() {
  mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(methodoverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

//INDEX ROUTE
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

//CREATE ROUTE
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

app.post("/listings", async (req, res) => {
  let newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
})

//SHOW ROUTE
app.get("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });

})

//EDIT ROUTE
app.get("/listings/:id/edit", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

app.put("/listings/:id", async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndUpdate(id, {...req.body.listing});
  res.redirect(`/listings/${id}`);
})

//DELETE ROUTE
app.delete("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
})


// app.get("/testListening", (req, res) => {
//   let sampleListing = new Listing ({
//     title: "Vishwasuman Farm House",
//     description: "River side view with delisious food for free",
//     price: 1600,
//     location: "Nastanpur, Maharashtra",
//     country: "India"
//   });

//   sampleListing.save().then(() => {
//     console.log("Data Saved successfully");
//   }).catch((err) => {
//     console.log(err);
//   });
//   res.send("Successful Testing");
// })

app.get("/", (req, res) => {
  res.send("Working");
});

app.listen(8080, () => {
  console.log("app listening to 8080");
});
