const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  id: {type: 'string'},
  userId: {type: 'string', required: true, unique: true},
  balance: {type: 'number', default: 0},
  transactions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Transaction'}],
});

const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet;

