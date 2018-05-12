import express from 'express';
import jwt from 'express-jwt';
import auth from './auth';
import adminRouter from './admin';
import config from '../config';
import Event from '../models/event';

// Load subroutes

const router = express.Router();

// Initialize subroutes
// TODO currently only admin, so only check token is valid, do not check the role is admin or not
router.use('/admin', jwt({ secret: config.token.secret }), adminRouter);

// Get concerts
router.get('/concerts', (req, res) => {
  const limit = parseInt(req.query.limit, 10);

  const findQuery = Event.find().sort({
    date: 'asc',
  });

  findQuery.exec((err, events) => {
    if (err) {
      return res.json(err);
    }
    console.log(events);
    const upcomingConcerts = events.filter(e => (e.type === 'concert' && e.visible && (Date.parse(e.date) >= Date.now()))).splice(0, limit);

    const pastConcerts = events.filter(e => (e.type === 'concert' && e.visible && (Date.parse(e.date) < Date.now()))).reverse().splice(0, limit);

    return res.json({
      data: {
        upcoming_concerts: upcomingConcerts,
        past_concerts: pastConcerts,
      },
    });
  });
});

router.use('/auth', auth);

module.exports = router;
