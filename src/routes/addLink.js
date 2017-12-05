const addLink = require('express').Router();
import { writePool } from '../db';
const sendResponse = require('../helpers/sendResponse');

addLink.route('/').post(async (req, res) => {
  try {
    const { userId, link } = req.query;

    const linkDetails = {
      userId,
      link,
    };

    const [newLink] = await writePool.query('INSERT INTO links SET ? ', linkDetails);

    res.status(200).json(newLink);
  } catch (err) {
    console.error(err);
    return sendResponse(res, 500, [], 'failed', 'something went wrong');
  }
});

module.exports = addLink;
