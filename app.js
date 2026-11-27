const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodoverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

const listingRouter = require("./routes/listing");
const reviewRouter = require("./routes/review");
const userRouter = require("./routes/user");

const dbUrl = process.env.ATLASDB_URL;

main().then(() => {
  console.log("Connected with DB");

  app.listen(process.env.PORT || 8080, () => {
    console.log("app listening");
  });
}).catch((err) => {
  console.error("MongoDB connection failed:", err);
});

async function main() {
  await mongoose.connect(dbUrl);
}

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(methodoverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 12 * 3600,
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
  }
};

store.on("error", (err) => {
  console.log("ERROR in MONGO SESSION STORE", err);
});
 
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); 

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

//Parent Route Of Listing
app.use("/listings", listingRouter);

//Parent Route Of Review
app.use("/listings/:id/reviews", reviewRouter);

//Parent Route of User
app.use("/", userRouter);

app.get("/", (req, res) => {
  res.redirect("/listings");
})

//404 Handler
app.all("/{*splat}", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

//Error Handler
app.use((err, req, res, next) => {
  let { statusCode = 500, message= "Some Error Occured" } = err;
  res.status(statusCode).render("listings/error.ejs", { message });
});

