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
  const limit = parseInt(req.query.limit);

  const findQuery = Event.find().sort({'date': 'asc'})

  findQuery.exec((err, events) => {
    if(err){ return res.json(err); }
    console.log(events);
    const upcoming_concerts = events.filter((e) => {
        return (e.type == "concert" && e.visible && (Date.parse(e.date) >= Date.now()))
      }).splice(0, limit);

    const past_concerts = events.filter((e) => {
        return (e.type == "concert" && e.visible && (Date.parse(e.date) < Date.now()))
      }).reverse().splice(0, limit);

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
