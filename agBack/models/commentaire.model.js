const mongoose = require('mongoose');
// var autoIncrement = require("mongodb-autoincrement");

const ComSchema = mongoose.Schema({

    _id: Number,
    // idPart: Number,
    // prenom_du_part: String,
    msg: String,
}
    );

// Schema.plugin(autoIncrement.mongoosePlugin);
// Schema.plugin(autoIncrement.mongoosePlugin);

module.exports = mongoose.model('coms', ComSchema);