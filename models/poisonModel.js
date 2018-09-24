var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/scraper');
mongoose.connection.on('error', function () {
  console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});
var PoisonsSchema = new mongoose.Schema({
  poisonName: String,
  poisonType: { type: String, lowercase: true },
  poisonousTo: Array,
  description: String,
  levelOfToxicity: String,
  symptoms: Array,
  alternateNames: Array,
});
module.exports = mongoose.model('Poison', PoisonsSchema);