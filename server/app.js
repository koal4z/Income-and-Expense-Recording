const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/recordingDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = new mongoose.model("User", userSchema);

const transactionSchema = new mongoose.Schema({
  user: String,
  amount: Number,
  type: {
    type: String,
    enum: ["income", "expense"]
  },
  remark: String,
  date: Date
});

const Transaction = new mongoose.model("Transaction", transactionSchema);

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
  const newUser = new User({
    username: req.body.username,
    password: req.body.password
  });

  newUser.save(err => {
    if (!err) {
      res.send("create user");
    } else {
      res.send(err.message);
    }
  });
});

app.post("/users/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ username: username, password: password }, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      res.send(err.message);
    }
  });
});

app.get("/transactions", (req, res) => {
  Transaction.find({ _id: req.query.user }, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      res.send(err.message);
    }
  });
});

app.post("/transactions", (req, res) => {
  const username = req.body.username;

  User.findOne({ username: username }, (err, data) => {
    if (!err) {
      const newTransactions = new Transaction({
        user: data._id,
        amount: req.body.number,
        type: req.body.type,
        remark: req.body.remark,
        date: new Date()
      });
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
});

app.put("/transactions/:id", (req, res) => {
  const id = req.params.id;
  const update = {
    amount: req.body.amount,
    type: req.body.type,
    remark: req.body.remark,
    date: new Date()
  };

  Transaction.findByIdAndUpdate(id, update, (err, data) => {
    if (!err) {
      res.send(id + " update complete");
    } else {
      res.send(err.message);
    }
  });
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
