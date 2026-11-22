const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodoverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");

const listings = require("./routes/listing");
const reviews = require("./routes/review");

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

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);



app.all("/*splat", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message= "Some Error Occured" } = err;
  res.status(statusCode).render("listings/error.ejs", { message });
});

app.get("/", (req, res) => {
  res.send("Working");
});

app.listen(8080, () => {
  console.log("app listening to 8080");
});
