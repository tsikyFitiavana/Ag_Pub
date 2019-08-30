const mongoose = require('mongoose');
// var autoIncrement = require("mongodb-autoincrement");

const EntrepriseSchema = mongoose.Schema({

    _id: {type :Number ,required: true },
    nom:  {type :String ,required: true },
    produitAuth: {type :String ,required: true },
    mots_cles: {type :String ,required: true },
    phones:{type :String ,required: true },
    email:{type :String ,required: true },
    emailPas: {type :String ,required: true }
}
    );

// Schema.plugin(autoIncrement.mongoosePlugin);
// Schema.plugin(autoIncrement.mongoosePlugin);

module.exports = mongoose.model('entreprises', EntrepriseSchema);