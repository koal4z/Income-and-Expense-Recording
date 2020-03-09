const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  user: mongoose.ObjectId,
  amount: Number,
  type: {
    type: String,
    enum: ["income", "expense"]
  },
  remark: String,
  date: Date
});

const Transaction = new mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
