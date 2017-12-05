import { Router } from 'express';
const routes = Router();

const login = require('./login');

/**
 * GET home page
 */
routes.get('/', (req, res) => {
    res.send('working');
  });

routes.use('/login', login);

module.exports = routes;

