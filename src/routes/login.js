const login = require('express').Router();
import { readPool, writePool } from '../db';
// const bcrypt = require('bcrypt');
const sendResponse = require('../helpers/sendResponse');
const jwt = require('jsonwebtoken');

login.route('/').post(async (req, res) => {
  try {

    const { username, email } = req.query;

    const userDetails = {
      username,
      email,
    };

    const [result] = await readPool.query(`SELECT username, email FROM users where email = '${email}'`);

    if (result.length === 0) {
      // Add username to table
      const [newUser] = await writePool.query('INSERT INTO users SET ? ', userDetails);
    }

    // generate token
    const userDetailForToken = {
      username,
      email,
    };
    
    const token = jwt.sign(
        userDetailForToken,
        process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY },
    );

    // set token in response header
    res.header('x-auth', token);

    // also send token in response body
    res.status(200).json({message:"Successfully logged in!", token: token,});
  } catch (err) {
    console.error(err);
    return sendResponse(res, 500, [], 'failed', 'something went wrong');
  }
});

module.exports = login;
