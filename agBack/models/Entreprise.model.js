const mongoose = require('mongoose');
// var autoIncrement = require("mongodb-autoincrement");

const EntrepriseSchema = mongoose.Schema({

    _id: Number,
    nom: String,
    produitAuth: String,
    mots_cles: String,
    phones: String,
    email: String
}
    );

// Schema.plugin(autoIncrement.mongoosePlugin);

module.exports = mongoose.model('entreprises', EntrepriseSchema);