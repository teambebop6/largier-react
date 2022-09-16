import express from 'express';
import jwt from 'express-jwt';
import auth from './auth';
import adminRouter from './admin';
import config from '../config';
import Event from '../models/event';
import { loadConcertsNumConfig } from '../utils/ConfigUtils';

const aggregatePastConcerts = (events) => {
  const concerts = {};
  const years = [];
  if (events) {
    events.forEach((e) => {
      const year = e.date.getFullYear();
      if (!concerts[year]) {
        concerts[year] = [];
        years.push(year);
      }
      concerts[year].push(e);
    });
    years.sort((a, b) => -(a - b));
  }
  return {
    years,
    concerts,
  };
};

// Load subroutes

const router = express.Router();

// Initialize subroutes
// TODO currently only admin, so only check token is valid, do not check the role is admin or not
router.use('/admin', jwt({ secret: config.token.secret }), adminRouter);

// Get concerts
router.get('/concerts', (req, res) => {
  const findQuery = Event.find().sort({
    date: 'asc',
  });

  findQuery.exec((err, events) => {
    if (err) {
      return res.json(err);
    }
    let upcomingConcerts = events.filter(e => (e.type === 'concert' && e.visible && (Date.parse(e.date) >= Date.now())));

    let pastConcerts = events.filter(e => (e.type === 'concert' && e.visible && (Date.parse(e.date) < Date.now()))).reverse();

    return loadConcertsNumConfig().then(({ past = 5, upcoming = 5 }) => {
      console.log(past);
      console.log(upcoming);
      upcomingConcerts = upcomingConcerts.splice(0, upcoming);
      pastConcerts = pastConcerts.splice(0, past);
      console.log(pastConcerts);
      console.log(upcomingConcerts);
      return res.json({
        data: {
          upcoming_concerts: upcomingConcerts,
          past_concerts: pastConcerts,
        },
      });
    }).catch(e => res.status(500).json(e));
  });
});

router.get('/concerts/all', (req, res) => {
  const findQuery = Event.find().sort({
    date: 'asc',
  });

  findQuery.exec((err, events) => {
    if (err) {
      return res.json(err);
    }
    const upcomingConcerts = events.filter(e => (e.type === 'concert' && e.visible && (Date.parse(e.date) >= Date.now())));

    const pastConcerts = events.filter(e => (e.type === 'concert' && e.visible && (Date.parse(e.date) < Date.now()))).reverse();

    return res.json({
      data: {
        upcoming_concerts: upcomingConcerts,
        past_concerts: aggregatePastConcerts(pastConcerts),
      },
    });
  });
});

router.use('/auth', auth);

module.exports = router;
