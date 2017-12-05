const login = require('express').Router();
import { readPool, writePool } from '../db';
// const bcrypt = require('bcrypt');
const sendResponse = require('../helpers/sendResponse');
//const jwt = require('jsonwebtoken');

login.get('/', async (req, res) => {
    //const { title } = req.query;
    try {
      const [result] = await readPool.query('SELECT * FROM users');
      res.json(result);
    } catch (error) {
      console.error(error)
    }
  });

login.route('/').post(async (req, res) => {
  try {
    console.log('abbaaa');
    console.log(req.query);

    const { username, email } = req.query;

    const userDetails = {
      username,
      email,
    };

    const [newUser] = await writePool.query('INSERT INTO users SET ? ', userDetails);

    res.status(200).json(newUser);
  } catch (err) {
    console.error(err);
    if (err.code === 'ER_DUP_ENTRY') {
      return sendResponse(res, 409, [], 'email/username already exist');
    }
    return sendResponse(res, 500, [], 'failed', 'something went wrong');
  }
});

module.exports = login;
