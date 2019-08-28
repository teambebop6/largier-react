/**
 *
 *   Generic CRUD template for item management
 *
 */
import express from 'express';
import { createGlobalIfNotExisting } from '../../utils/ConfigUtils';

const router = express.Router();

// Load relevant model
const Model = require('../../models/configuration');

const GLOBAL = 'global';

createGlobalIfNotExisting();

// List
router.get('/', (req, res) => {
  Model.findOne({ groupName: GLOBAL }, (err, item) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.json(item.items || {});
  });
});

// Update (expects multipart header)
router.post('/', (req, res) => {
  Model.findOne({ groupName: GLOBAL }, (err, item) => {
    if (err) {
      return res.status(500).json(err);
    }

    item.items = req.body;

    return item.save((itemErr) => {
      if (itemErr) {
        return res.status(500).json(err);
      }
      // OK
      return res.json(item.items);
    });
  });
});

module.exports = router;
