/**
 * Created by Henry Huang.
 */
import express from 'express';

const router = express.Router();

router.post('/login', (req, res) => {
  if(req.body.username == req.app.locals.config.ADMIN_NAME &&
    req.body.password == req.app.locals.config.ADMIN_PASSWORD){

    res.json({
      result: 'login successful!'
    });
  }else{
    res.sendStatus(500);
  }
});

router.post('/logout', (req, res) => {
  res.json({
    result: 'logout successful!'
  });
});

module.exports = router;

