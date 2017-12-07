const updateLink = require('express').Router();
import { writePool } from '../db';

updateLink.patch('/', async (req, res) => {
  try {
    // validate by using express-validator
    req.check('link', 'invalid link').exists().isURL();

    const errors = req.validationErrors();
    if (errors) {
      res.status(400).send(errors[0].msg);
      return;
    }

    const { id, link } = req.query;

    const [newLink] = await writePool.query(`Update links SET link = '${link}' where id = ${id}`);

    res.status(200).json(newLink);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
});

module.exports = updateLink;
