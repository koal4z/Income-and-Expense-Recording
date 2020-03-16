const express = require("express");
const User = require("../models/user");
const router = express.Router();

const bcrypt = require("bcrypt");
const saltRounds = 10;
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
passport.use(User.createStrategy());

passport.use(new LocalStrategy(User.authenticate("local")));

passport.serializeUser(
  User.serializeUser(function(user, done) {
    done(null, user.id);
  })
);
passport.deserializeUser(
  User.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  })
);

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
    if (data !== null) {
      bcrypt.compare(req.body.password, data.password, (err, result) => {
        if (result === true) {
          passport.authenticate("local")(req, res, () => {
            // req.session.passport.user = data._id
            console.log(req.session);
            req.session.save();
            res.send("login");
          });
        } else {
          res.send("Incorrect password");
        }
      });
    } else {
      res.send("No id account. Please sign up");
    }
  });
});

router.get("/switchUser", (req, res) => {
  const user = req.query.user;
  User.find({ username: user }, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      res.status(404).send("no user");
    }
  });
});

router.get("user/logout", (req, res) => {
  req.logout();
  req.session.destroy();
});

module.exports = router;
