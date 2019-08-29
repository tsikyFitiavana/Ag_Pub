const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ClientPartUsersSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
   },
  name: {
    type: String,
    required: true
  },
  adresse_exacte: {
    type: String,
    required: true
  },
  phones: {
    type: String,
    required: true
  },
  nombreDecom: Number,
  idProduitCommender: Number,
});

module.exports = mongoose.model('ClientPartUsers', ClientPartUsersSchema);