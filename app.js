const express = require('express');
const { engine } = require('express-handlebars');
const multer = require('multer');
const Handlebars = require('handlebars');
const imageModel = require('./models/upload');
const imageData = imageModel.find({});

const app = express();

app.use(express.static('public/images'));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");

var Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/images");
  },
  // create random file name
  filename: function(req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

var upload = multer( {
  storage: Storage,
}).single("image"); // only upload one image at a time


app.get('/', (req, res) => {
  imageData.clone().find(function(err, data) {
    if(err) throw err;
    
    console.log(data);
    
    res.render('home', {records:data});
  });
});

app.post('/', (req, res) => {
  upload(req, res, function(err) {
    if(err) {
      console.log(err);
      return res.end("Error uploading image");
    } else {
      console.log(req.file.path);
      var filename = req.file.filename;
      var filedescription = req.body.description;
      var imageDetails = new imageModel({
        imagename:filename,
        imagedescription:filedescription
      });
      imageDetails.save(function(err, doc) {
        if(err) throw err;
        
        imageData.clone().exec(function(err, data) {
          if(err) throw err;
          
          res.render('home', {records:data, success:true});
        });
      });
    }
  });
});

app.listen(3000, () => {
  console.log("App is listening on port 3000");
});