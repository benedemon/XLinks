const login = require('express').Router();
import { readPool, writePool } from '../db';
const jwt = require('jsonwebtoken');

login.route('/').post(async (req, res) => {
  try {
    // validate by using express-validator
    req.check('username', 'username is required').exists();
    req.check('email', 'invalid email').exists().isEmail();

    const errors = req.validationErrors();
    if (errors) {
      res.status(400).send(errors[0].msg);
      return;
    }

    const { username, email } = req.query;

    const userDetails = {
      username,
      email,
    };

    let [user] = await readPool.query('SELECT userId, username, email FROM users where email = ?', [email]);

    if (user.length === 0) {
      // Add username to table
      await writePool.query('INSERT INTO users SET ? ', userDetails);
      [user] = await readPool.query('SELECT userId, username, email FROM users where email = ?', [email]);
    }

    // generate token
    const userDetailsForToken = {
      userId: user[0].userId,
      username,
      email,
    };
    
    console.log('USER DETAILS', userDetailsForToken);
    const token = jwt.sign(
        userDetailsForToken,
        process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY },
    );

    // set token in response header
    res.header('x-auth', token);

    // also send token in response body
    res.status(200).json({message:"Successfully logged in!", token: token,});
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
});

module.exports = login;
