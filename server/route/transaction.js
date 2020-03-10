const express = require("express");
const User = require("../models/user");
const Transaction = require("../models/transaction");
const router = express.Router();

router
  .get("/transactions", (req, res) => {
    if (req.isAuthenticated()) {
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
  })
  .post("/transactions", (req, res) => {
    if (req.isAuthenticated()) {
      const id = req.user.id;
      const newTransactions = new Transaction({
        user: id,
        amount: req.body.amount,
        type: req.body.type,
        remark: req.body.remark,
        date: new Date()
      });

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
          res.send(err.message);
        }
      });
    } else {
      res.status(401).json({ message: "Please Login first" });
    }
  });

router
  .put("/transactions/:id", (req, res) => {
    const id = req.params.id;
    const update = {
      amount: req.body.amount,
      type: req.body.type,
      remark: req.body.remark,
      date: new Date()
    };

    if (req.isAuthenticated()) {
      if (update.type !== "income" && update.type !== "expense") {
        res
          .status(404)
          .json({ message: "wrong type | Please check your type" });
      } else {
        Transaction.findByIdAndUpdate(id, update, (err, data) => {
          if (!err) {
            res.send(id + " update complete");
          } else {
            res.send(err.message);
          }
        });
      }
    } else {
      res.status(401).json({ message: "Please login before update!!!" });
    }
  })
  .delete("/transactions/:id", (req, res) => {
    const id = req.params.id;
    Transaction.findByIdAndDelete(id, err => {
      if (!err) {
        res.send(id + " is deleted");
      } else {
        res.send(err.message);
      }
    });
  });

module.exports = router;
