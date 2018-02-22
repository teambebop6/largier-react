import express from 'express';
import auth from './auth';
import jwt from 'express-jwt';
import adminRouter from './admin';
import config from '../config';

// Load subroutes

import Event from '../models/event';

const router = express.Router();

// Initialize subroutes
// TODO currently only admin, so only check token is valid, do not check the role is admin or not
router.use('/admin', jwt({ secret: config.token.secret }), adminRouter);

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
