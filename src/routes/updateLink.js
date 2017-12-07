const updateLink = require('express').Router();
import { writePool } from '../db';
const sendResponse = require('../helpers/sendResponse');

updateLink.post('/', async (req, res) => {
  try {
    const { id, link } = req.query;

    const [newLink] = await writePool.query(`Update links SET link = '${link}' where id = ${id}`);

    res.status(200).json(newLink);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
});

module.exports = updateLink;
