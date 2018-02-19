/***
 *
 *   Generic CRUD template for item management
 * 
 * **/


import express from 'express';

var multer = require('multer');
var path = require('path');
var mkdirp = require('mkdirp');
var crypto = require('crypto');
var mime = require('mime');
var fs = require('fs');

const router = express.Router();

// Load relevant model
const Model = require('../../models/event');

// Configure multipart handler & upload destination
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var p = path.join(req.app.locals.config.UPLOAD_FOLDER, '/events/');
    mkdirp.sync(p);
    cb(null, p)
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.getExtension(file.mimetype));
    });
  }
});
var upload = multer({storage: storage});


// List
router.get('/', (req, res, next) => {
  Model.find((err, items) => {
    if(err){ return res.status(500).json(err); }
    res.json(items);
  });
});


// Create
router.post('/add', upload.fields(
[
  { name: 'avatar', maxCount: 1 },
]
), (req, res, next) => {
  console.log(req.body);
  var item = new Model(JSON.parse(req.body.item));
  console.log("Adding new item:");
  console.log(item);

  // Files
  if(req.files.avatar && req.files.avatar.length > 0){
    item.avatar = req.files.avatar[0];
  }

  item.save((err) => {
    if(err){ return res.status(500).json(err); }

    // OK
    res.json({ok: true});
  })
});

// Read
router.get('/item/:id', (req, res) => {
  Model.findOne({_id: req.params.id}, (err, item) => {
    if(err){ return res.status(500).json(err); }

    res.json(item);
  });
});

// Update (expects multipart header)
router.post('/item/:id', upload.fields(
[
  { name: 'avatar', maxCount: 1 },
]
), (req, res, next) => {
  Model.findOne({_id: req.params.id}, (err, item) => {
    if(err){ return res.status(500).json(err); }

    let req_item = JSON.parse(req.body.item)

    req_item._id = item._id;

    for (var property in req_item) {
      if (req_item.hasOwnProperty(property)) {
        item[property] = req_item[property]
      }
    } 

    if(req.files.avatar && req.files.avatar.length > 0){
      item.avatar = req.files.avatar[0]
    }

    item.save((err) => {
      if(err){ return res.status(500).json(err); }

      // OK
      res.json({ok: true});
    })
  });
});

// Delete
router.post('/delete', (req, res, next) => {
  Model.findOne({_id: req.body.id}, (err, item) => {
    if(err){ return res.status(500).json(err); }
    if(!item){ return res.status(500).json({message: "Item not found."}) }

    item.remove((err) => {
      if(err){ return res.status(500).json(err); }

      // Delete related files
      if(item.avatar){
        fs.unlink(item.avatar.path, function (err) {
          if (err) { console.log(err) }
          else { console.log("Deleted image: " + item.avatar.path); }
        });
      }

      // OK
      res.json({ok:true});

    })
  });
});

module.exports = router;
