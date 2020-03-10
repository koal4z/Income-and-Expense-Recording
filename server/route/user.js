const express = require("express");
const User = require("../models/user");
const router = express.Router();

const bcrypt = require("bcrypt");
const saltRounds = 10;
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
passport.use(User.createStrategy());

passport.use(new LocalStrategy(User.authenticate("local")));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router
  .get("/users", (req, res) => {
    User.find((err, data) => {
      if (!err) {
        res.send(data);
      } else {
        res.send(err.message);
      }
    });
  })
  .post("/users", (req, res) => {
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

router.get("/users/:id", (req, res) => {
  const id = req.params.id;

  User.findById(id, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      res.send(err.message);
    }
  });
});

router.post("/users/login", (req, res) => {
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

router.get("user/logout", (req, res) => {
  req.logout();
});

module.exports = router;
