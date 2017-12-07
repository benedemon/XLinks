const getLinks = require('express').Router();

import { readPool } from '../db';

getLinks.get('/', async (req, res) => {
    try {
      console.log(req.user);
      const queryId = req.user.userId;
      const [result] = await readPool.query('SELECT * FROM links WHERE userId = ?', [queryId]);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Something went wrong');
    }
  });

module.exports = getLinks;
