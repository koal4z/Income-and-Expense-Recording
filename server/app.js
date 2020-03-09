const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("./models/user");
const Transaction = require("./models/transaction");
const app = express();

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

passport.use(User.createStrategy());
passport.use(new LocalStrategy(User.authenticate("local")));

passport.serializeUser(User.serializeUser());

passport.deserializeUser(User.deserializeUser());

app.get("/users", (req, res) => {
  User.find((err, data) => {
    if (!err) {
      res.send(data);
    } else {
      res.send(err.message);
    }
  });
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;

  User.findById(id, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      res.send(err.message);
    }
  });
});

app.post("/users", (req, res) => {
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      User.register(
        {
          username: req.body.username,
          password: hash
        },
        req.body.password,
        (err, user) => {
          if (err) {
            res.send(err.message);
          } else {
            passport.authenticate("local")(req, res, () => {
              req.session.save();
              res.send("create complete");
            });
          }
        }
      );
    });
  });
});

app.post("/users/login", (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password
  };
  User.findOne({ username: user.username }, (err, data) => {
    bcrypt.compare(req.body.password, data.password, (err, result) => {
      if (result === true) {
        passport.authenticate("local")(req, res, () => {
          res.send("login");
        });
      } else {
        res.send("Incorrect password");
      }
    });
  });
});

app.get("user/logout", (req, res) => {
  req.logout();
});

app.get("/transactions", (req, res) => {
  if (req.isAuthenticated()) {
    console.log(req.user.id);
    if (req.query.user === undefined) {
      Transaction.find({ user: req.user.id }, (err, data) => {
        if (!err) {
          res.send(data);
        } else {
          res.status(404).json({ message: "wrong id" });
        }
      });
    } else {
      Transaction.find({ _id: req.query.user }, (err, data) => {
        if (!err) {
          res.send(data);
        } else {
          res.status(404).json({ message: "wrong id" });
        }
      });
    }
  } else {
    res.status(401).json({ message: "Please Login before search" });
  }
});

app.post("/transactions", (req, res) => {
  const newTransactions = new Transaction({
    user: req.user.id,
    amount: req.body.amount,
    type: req.body.type,
    remark: req.body.remark,
    date: new Date()
  });

  if (req.isAuthenticated()) {
    let id = req.user.id;
    User.findById(id, (err, data) => {
      if (!err) {
        newTransactions.save(err => {
          if (!err) {
            res.send("create new transactions");
          } else {
            res.send(err.message);
          }
        });
      } else {
        console.log(err.message);
      }
    });
  } else {
    res.status(401).json({ message: "Please Login first" });
  }
});

app.put("/transactions/:id", (req, res) => {
  const id = req.params.id;
  const update = {
    amount: req.body.amount,
    type: req.body.type,
    remark: req.body.remark,
    date: new Date()
  };
  if (req.isAuthenticated()) {
    Transaction.findByIdAndUpdate(id, update, (err, data) => {
      if (!err) {
        res.send(id + " update complete");
      } else {
        res.send(err.message);
      }
    });
  } else {
    res.status(401).json({ message: "Please login before update!!!" });
  }
});

app.delete("/transactions/:id", (req, res) => {
  const id = req.params.id;
  Transaction.findByIdAndDelete(id, err => {
    if (!err) {
      res.send(id + " is deleted");
    } else {
      res.send(err.message);
    }
  });
});

app.listen(port, () => {
  console.log(`Server start at port ${port}`);
});
