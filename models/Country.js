const mongoose = require('mongoose');

// Define the Mongoose Schema
const countrySchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true},
    continent: { type: String, required: true},    
    languages: [String],  
});

// Export the 'countrySchema' schema as 'Country' model
module.exports = mongoose.model('Country', countrySchema);