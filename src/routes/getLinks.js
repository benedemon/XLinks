const showLinks = require('express').Router();
import { readPool, writePool } from '../db';

showLinks.get('/', async (req, res) => {
    try {

      const [result] = await readPool.query('SELECT * FROM links');
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Something went wrong');
    }
  });

module.exports = getLinks;
