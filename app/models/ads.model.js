const mongoose = require('mongoose');

const AdsSchema = mongoose.Schema({
    title: String,
    content: String,
    urlImage: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Ads', AdsSchema);
