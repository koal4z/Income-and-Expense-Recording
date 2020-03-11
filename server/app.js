const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const session = require("express-session");
const userRoute = require("./route/user");
const transactionRoute = require("./route/transaction");
const passport = require("passport");
const cors = require("cors");
const app = express();
app.use(express.static('public'))

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "TOpsecret",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/recordingDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

app.use("/", userRoute);
app.use("/", transactionRoute);

app.listen(port, () => {
  console.log(`Server start at port ${port}`);
});
