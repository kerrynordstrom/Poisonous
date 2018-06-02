var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/scraper');
mongoose.connection.on('error', function () {
  console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});
var ListingsSchema = new mongoose.Schema({
  name: String,
  type: { type: String, lowercase: true },
  poisonousTo: Array,
  description: String,
  levelOfToxicity: String,
  symptoms: Array,
  alternateNamesn: Array,
});
module.exports = mongoose.model('Listings', ListingsSchema);