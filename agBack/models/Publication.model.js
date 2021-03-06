const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PublicationSchema = new Schema({
    _id: { type: Number, required: true },
    nom: { type: String, required: true },
    comsNumber: { type: Number},
    description: { type: String, required: true },
    marque: { type: String, required: true },
    prix: { type: String, required: true },
    idUser: Number,
    clesEntreprPub: String,
    image: { type: String, required: true },
    image1: { type: String, required: true },
    image2: { type: String, required: true }
    
}, {
        timestamps: true
    });

module.exports = mongoose.model("publications", PublicationSchema);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);