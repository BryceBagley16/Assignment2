const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://assignment2:thisisapassword@cluster0.oxjnqxx.mongodb.net/imagesDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) {
    console.log(err);
  }
  else {
    console.log("Connected to database");
  }
});


var uploadSchema = new mongoose.Schema({
  imagename: String,
  imagedescription: String
});

var uploadModel = mongoose.model('images', uploadSchema);

module.exports = uploadModel;