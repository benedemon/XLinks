const deleteLink = require('express').Router();
import { readPool, writePool } from '../db';
// const bcrypt = require('bcrypt');
const sendResponse = require('../helpers/sendResponse');
//const jwt = require('jsonwebtoken');

deleteLink.get('/', async (req, res) => {
    //const { title } = req.query;
    try {
      const [result] = await readPool.query('SELECT * FROM links');
      res.json(result);
    } catch (error) {
      console.error(error)
    }
  });

deleteLink.route('/').post(async (req, res) => {
  try {
    console.log('abbaaa');
    console.log(req.query);

    const { userId, link } = req.query;

    const linkDetails = {
      userId,
      link,
    };

    const [newLink] = await writePool.query(`Delete from links where link = '${link}' `);

    res.status(200).json(newLink);
  } catch (err) {
    console.error(err);
    if (err.code === 'ER_DUP_ENTRY') {
      return sendResponse(res, 409, [], 'email/username already exist');
    }
    return sendResponse(res, 500, [], 'failed', 'something went wrong');
  }
});

module.exports = deleteLink;