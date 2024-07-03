var express = require('express');
const Wallet = require('../model/Wallet');
const isValidID = require('../utils/isValidID');
const Transaction = require('../model/Transaction');
var router = express.Router();

router.get('/get-all', (req, res) => {
  Wallet.find({})
    .then(wallets => {
      res.send(wallets);
    })
    .catch(err => {
      res.send(err);
    });
});

// GET: Returns the details of a specific wallet
router.get('/get-by-id/:id', (req, res) => {
  if (isValidID(req.params.id)) {
    Wallet.findOne({userId: req.params.id})
      .lean()
      .then(wallet => {
        if (!wallet) {
          res.status(404).send('Wallet not found');
        } else {
          Transaction.find({walletId: wallet._id})
            .lean()
            .then(response => {
              res.status(200).send({...wallet, transactions: response});
            });
          // res.status(200).send(wallet);
        }
      })
      .catch(err => {
        res.send(err);
      });
  } else res.status(400).send('Bad request');
});

// POST: Creates a new wallet
router.post('/save', (req, res) => {
  const newWallet = new Wallet({
    ...req.body,
  });
  newWallet
    .save()
    .then(wallet => {
      res.send(wallet);
    })
    .catch(err => {
      res.send(err);
    });
});

// PUT: Updates the details of an existing wallet
router.put('/update/:id', (req, res) => {
  if (isValidID(req.params.id)) {
    Wallet.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(wallet => {
        res.send(wallet);
      })
      .catch(err => {
        res.send(err);
      });
  } else res.status(400).send('Bad request');
});

// DELETE: Deletes an existing wallet
router.delete('/delete/:id', (req, res) => {
  if (isValidID(req.params.id)) {
    Wallet.findByIdAndRemove(req.params.id)
      .then(wallet => {
        res.send(wallet);
      })
      .catch(err => {
        res.send(err);
      });
  } else res.status(400).send('Bad request');
});

module.exports = router;
