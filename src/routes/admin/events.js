/**
 *
 *   Generic CRUD template for item management
 *
 */
import express from 'express';
import multer from 'multer';
import path from 'path';
import mkdirp from 'mkdirp';
import crypto from 'crypto';
import mime from 'mime';
import fs from 'fs';

const router = express.Router();

// Load relevant model
const Model = require('../../models/event');

// Configure multipart handler & upload destination
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const p = path.join(req.app.locals.config.UPLOAD_FOLDER, '/events/');
    mkdirp.sync(p);
    cb(null, p);
  },
  filename: (req, file, cb) => {
    crypto.pseudoRandomBytes(16, (err, raw) => {
      cb(null, `${raw.toString('hex')}${Date.now()}.${mime.getExtension(file.mimetype)}`);
    });
  },
});
const upload = multer({ storage });


// List
router.get('/', (req, res) => {
  Model.find((err, items) => {
    if (err) {
      return res.status(500).json(err);
    }
    console.log(items);
    return res.json(items);
  });
});


// Create
router.post('/add', upload.fields([
  { name: 'avatar', maxCount: 1 },
]), (req, res) => {
  console.log(req.body);
  const item = new Model(JSON.parse(req.body.item));
  console.log('Adding new item:');
  console.log(item);

  // Files
  if (req.files.avatar && req.files.avatar.length > 0) {
    item.avatar = req.files.avatar[0];
  }

  item.save((err) => {
    if (err) {
      return res.status(500).json(err);
    }
    // OK
    return res.json({ ok: true });
  });
});

// Read
router.get('/item/:id', (req, res, next) => {
  Model.findOne({ _id: req.params.id }, (err, item) => {
    if (err) {
      return next(err);
    }
    return res.json({
      data: item,
    });
  });
});

// Update (expects multipart header)
router.post('/item/:id', upload.fields([
  { name: 'avatar', maxCount: 1 },
]), (req, res) => {
  Model.findOne({ _id: req.params.id }, (err, item) => {
    if (err) {
      return res.status(500).json(err);
    }

    const reqItem = JSON.parse(req.body.item);

    reqItem._id = item._id;

    Object.keys(reqItem).forEach((property) => {
      if (Object.prototype.hasOwnProperty.call(reqItem, property)) {
        item[property] = reqItem[property];
      }
    });

    if (req.files.avatar && req.files.avatar.length > 0) {
      item.avatar = req.files.avatar[0];
    }

    return item.save((itemErr) => {
      if (itemErr) {
        return res.status(500).json(err);
      }
      // OK
      return res.json({ ok: true });
    });
  });
});

// Delete
router.post('/delete', (req, res, next) => {
  console.log(req.body);
  Model.findOne({ _id: req.body.id }, (err, item) => {
    if (err) {
      return next(err);
    }
    if (!item) {
      return next(Error('Item not found.'));
    }

    return item.remove((itemError) => {
      if (itemError) {
        return next(itemError);
      }

      // Delete related files
      if (item.avatar) {
        fs.unlink(item.avatar.path, (delError) => {
          if (delError) {
            console.log(delError);
          } else {
            console.log(`Deleted image: ${item.avatar.path}`);
          }
        });
      }
      // OK
      return res.json({ ok: true });
    });
  });
});

module.exports = router;
