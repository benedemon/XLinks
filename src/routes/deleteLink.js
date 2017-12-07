const deleteLink = require('express').Router();
import { writePool } from '../db';
const sendResponse = require('../helpers/sendResponse');

deleteLink.route('/').post(async (req, res) => {
  try {
    const id = req.query.id;

    const [newLink] = await writePool.query(`Delete from links where id = '${id}' `);

    res.status(200).json(newLink);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
});

module.exports = deleteLink;