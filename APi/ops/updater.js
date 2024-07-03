const Wallet = require('../model/Wallet');

const updateWalletAmount = (transaction, res) => {
  Wallet.findByIdAndUpdate(
    transaction.walletId,
    {$inc: {balance: transaction.amount}},
    {new: true},
  )
    .then(wallet => {
      res.send({transaction, wallet});
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const logNewTransaction = (newTransaction, res) => {
  newTransaction
    .save()
    .then(transaction => {
      if (transaction._id) {
        updateWalletAmount(transaction, res);
      } else {
        res.status(500).send(transaction);
      }
    })
    .catch(err => {
      res.send(err);
    });
};

module.exports = {logNewTransaction: logNewTransaction};
