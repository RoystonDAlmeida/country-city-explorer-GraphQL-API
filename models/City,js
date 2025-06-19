const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name: { type: String, required: true },
    population: Number,
    country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true },
});

module.exports = mongoose.model('City', citySchema);