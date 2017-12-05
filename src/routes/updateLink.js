const updateLink = require('express').Router();
import { readPool, writePool } from '../db';
// const bcrypt = require('bcrypt');
const sendResponse = require('../helpers/sendResponse');
//const jwt = require('jsonwebtoken');

updateLink.get('/', async (req, res) => {
    //const { title } = req.query;
    try {
      console.log("here");
      const [result] = await readPool.query('SELECT * FROM links');
      res.json(result);
    } catch (error) {
      console.error(error)
    }
  });

updateLink.post('/', async (req, res) => {
  try {
    console.log('abbaaa');
    console.log(req.query);

    const { userId, link } = req.query;

    const [newLink] = await writePool.query(`Update links SET link = '${link}' where userId = ${userId}`);

    res.status(200).json(newLink);
  } catch (err) {
    console.error(err);
    if (err.code === 'ER_DUP_ENTRY') {
      return sendResponse(res, 409, [], 'email/username already exist');
    }
    return sendResponse(res, 500, [], 'failed', 'something went wrong');
  }
});

module.exports = updateLink;
