const getLinks = require('express').Router();
import { readPool } from '../db';

getLinks.get('/', async (req, res) => {
    try {

      const [result] = await readPool.query('SELECT * FROM links');
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Something went wrong');
    }
  });

module.exports = getLinks;
