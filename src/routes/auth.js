/**
 * Created by Henry Huang.
 */
import express from 'express';
import { User } from '../models/index';
import roleConst from '../constants/role';
import jsonWebToken from 'jsonwebtoken';
import jwt from 'express-jwt';
import config from '../config';

const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  User
    .findOne({
      username: username,
      password: password
    })
    .then((user) => {
      if (user) {
        const token = jsonWebToken.sign({
          username: username,
          role: user.role,
        }, config.token.secret, { // get secret from config
          expiresIn: config.token.expired // expires in 1 day
        });
        return res.json({
          data: {
            username: username,
            token: token,
            role: user.role,
          }
        })
      } else {
        return res.status(400).json({
          errors: [ 'User cannot be found.' ]
        })
      }
    })
});

router.post('/logout', (req, res) => {
  res.json({
    result: 'logout successful!'
  });
});

router.post('/register', (req, res) => {

  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({
      message: 'Username, password, email cannot be empty!',
    })
  }

  User.findOne({
    username: username
  }).then((user) => {
    if (!user) {
      const role = roleConst.ADMIN; // TODO only admin now
      new User({
        username: username,
        password: password,
        // TODO encrypt it
        email: email,
        role,
      })
        .save()
        .then(() => {
          const token = jsonWebToken.sign({
            username: username,
            role,
          }, config.token.secret, { // get secret from config
            expiresIn: config.token.expired // expires in 1 day
          });
          return res.json({
            data: {
              username: username,
              email: email,
              token: token
            }
          })
        }).catch((err) => {
        throw err
      })
    } else {
      return res.status(400).json({
        errors: [
          'User has already existed!',
        ]
      })
    }
  }).catch((error) => {
    return res.status(500).json({
      errors: [
        error.message,
      ]
    })
  });
});

router.post('/test', jwt({ secret: config.token.secret }), (req, res) => {
  res.json({
    data: req.user,
  })
});

export default router;
