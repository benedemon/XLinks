const addLink = require('express').Router();
import { writePool } from '../db';

addLink.route('/').post(async (req, res) => {
  try {
    const { link } = req.query;
    const user = req.user;

    const linkDetails = {
      userId: user.userId,
      link,
    };

    const [newLink] = await writePool.query('INSERT INTO links SET ? ', linkDetails);

    res.status(200).json(newLink);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong.');
  }
});

module.exports = addLink;
