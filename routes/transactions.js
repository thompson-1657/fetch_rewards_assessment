const express = require("express");
const router = express.Router();
const Transaction = require("../models/transaction");

//Getting all transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Getting One Transaction
router.get("/:id", getTransaction, (req, res) => {
  res.json(res.transaction);
});

//Creating One Transaction
router.post("/", async (req, res) => {
  const transaction = new Transaction({
    payer: req.body.payer,
    points: req.body.points,
  });
  try {
    const newTransactions = await transaction.save();
    res.status(201).json(newTransactions);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Deleting One Transaction
router.delete("/:id", getTransaction, async (req, res) => {
  try {
    await res.transaction.remove();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getTransaction(req, res, next) {
  let transaction;
  try {
    transaction = await Transaction.findById(req.params.id);
    if (transaction == null) {
      return res.status(400).json({ message: "Cannot find transaction" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.transaction = transaction;
  next();
}

module.exports = router;
