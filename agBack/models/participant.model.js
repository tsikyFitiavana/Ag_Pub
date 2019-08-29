const mongoose = require('mongoose');
// var autoIncrement = require("mongodb-autoincrement");

const ParticipantSchema = mongoose.Schema({

    _id: Number,
    nom: String,
    prenom: String,
    email: String,
    phones: String
}
    );

// Schema.plugin(autoIncrement.mongoosePlugin);
// Schema.plugin(autoIncrement.mongoosePlugin);

module.exports = mongoose.model('participants', ParticipantSchema);