/**
 * Created by Henry Huang.
 */
import express from 'express';
import jsonWebToken from 'jsonwebtoken';
import jwt from 'express-jwt';
import { User } from '../models/index';
import roleConst from '../constants/role';
import config from '../config';

const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  User
    .findOne({
      username,
      password,
    })
    .then((user) => {
      if (user) {
        const token = jsonWebToken.sign({
          username,
          role: user.role,
        }, config.token.secret, { // get secret from config
          expiresIn: config.token.expired, // expires in 1 day
        });
        return res.json({
          data: {
            username,
            token,
            role: user.role,
          },
        });
      }
      return res.status(400).json({
        errors: ['User cannot be found.'],
      });
    });
});

router.post('/logout', (req, res) => {
  res.json({
    result: 'logout successful!',
  });
});

router.post('/register', (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({
      message: 'Username, password, email cannot be empty!',
    });
  }

  return User.findOne({
    username,
  }).then((user) => {
    if (!user) {
      const role = roleConst.ADMIN; // TODO only admin now
      return new User({
        username,
        // TODO encrypt it
        password,
        email,
        role,
      })
        .save()
        .then(() => {
          const token = jsonWebToken.sign({
            username,
            role,
          }, config.token.secret, { // get secret from config
            expiresIn: config.token.expired, // expires in 1 day
          });
          return res.json({
            data: {
              username,
              email,
              token,
            },
          });
        }).catch((err) => {
          throw err;
        });
    }
    return res.status(400).json({
      errors: [
        'User has already existed!',
      ],
    });
  }).catch(error => res.status(500).json({
    errors: [
      error.message,
    ],
  }));
});

router.post('/test', jwt({ secret: config.token.secret }), (req, res) => {
  res.json({
    data: req.user,
  });
});

export default router;
