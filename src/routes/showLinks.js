const showLinks = require('express').Router();
import { readPool, writePool } from '../db';
// const bcrypt = require('bcrypt');
const sendResponse = require('../helpers/sendResponse');
//const jwt = require('jsonwebtoken');

showLinks.get('/', async (req, res) => {
    //const { title } = req.query;
    try {
      const [result] = await readPool.query('SELECT * FROM links');
      res.json(result);
    } catch (error) {
      console.error(error)
    }
  });

module.exports = showLinks;
