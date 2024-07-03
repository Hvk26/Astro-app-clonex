var express = require("express");
const Transaction = require("../model/Transaction");
const Wallet = require("../model/Wallet");
const { logNewTransaction } = require("../ops/updater");
const isValidID = require("../utils/isValidID");
var router = express.Router();

router.get("/get-all", (req, res) => {
  Transaction.find({})
    .then((transactions) => {
      res.send(transactions);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/get-by-id/:id", (req, res) => {
  if (isValidID(req.params.id)) {
    Transaction.findById(req.params.id)
      .then((transaction) => {
        if (!transaction) {
          res.status(404).send("Transaction not found");
        } else {
          res.send(transaction);
        }
      })
      .catch((err) => {
        res.send(err);
      });
  } else res.status(400).send("Bad request");
});

router.post("/recharge", (req, res) => {
  const newTransaction = new Transaction({
    ...req.body,
  });
  logNewTransaction(newTransaction, res);
});

router.post("/deduct", (req, res) => {
  Wallet.findById(req.body.walletId)
    .then((wallet) => {
      if (wallet.balance > req.body.amount) {
        const newTransaction = new Transaction({
          ...req.body,
          amount: req.body.amount * -1,
        });
        logNewTransaction(newTransaction, res);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get("/by-wallet-id/:id", (req, res) => {
  if (isValidID(req.params.id)) {
    Transaction.find({ walletId: req.params.id })
      .then((transactions) => {
        if (!transactions) {
          res.status(404).send("Transaction not found");
        } else {
          res.send(transactions);
        }
      })
      .catch((err) => {
        res.send(err);
      });
  } else res.status(400).send("Bad request");
});

router.get("/by-user-id/:id", (req, res) => {
  if (req.params.id) {
    Wallet.find({ userId: req.params.id })
      .lean()
      .then((wallets) => {
        if (wallets.length > 0) {
          const idArray = wallets.map((wallet) => wallet._id.toString());
          Transaction.find({ walletId: { $in: [...idArray] } })
            .lean()
            .then((transactions) => {
              if (!transactions) {
                res.status(404).send("Transaction not found");
              } else {
                res.send(transactions);
              }
            })
            .catch((err) => {
              res.send(err);
            });
        } else res.send(err);
      })
      .catch((err) => {
        res.send(err);
      });
  } else res.status(400).send("Bad request");
});

module.exports = router;
