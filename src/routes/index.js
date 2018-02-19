import express from 'express';
import auth from './auth';

// Load subroutes
import admin_events_router from './admin/events'

import Event from '../models/event';

const router = express.Router();

// Initialize subroutes
router.use('/admin/events', admin_events_router)

// Get concerts
router.get('/concerts', function (req, res, next) {
  Event.find().sort({'date': 'asc'}).exec((err, events) => {
    if(err){ return res.json(err); }

    const upcoming_concerts = events.filter((e) => {
        return (e.type == "concert" && (Date.parse(e.date) >= Date.now()))
      });

    const past_concerts = events.filter((e) => {
        return (e.type == "concert" && (Date.parse(e.date) < Date.now()))
      }).reverse();
    
    res.json({
      data: {
        upcoming_concerts: upcoming_concerts,
        past_concerts: past_concerts,
      }
    });
  });
});

router.use('/auth', auth);

module.exports = router;
