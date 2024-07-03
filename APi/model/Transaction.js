const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  id: {type: 'string'},
  transactionId: {type: 'string', unique: true},
  walletId: {type: 'string', required: true},
  description: {type: 'string', required: true},
  amount: {type: 'number', required: true},
  date: {type: 'date', default: Date.now(), required: true},
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
