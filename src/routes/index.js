import { Router } from 'express';
const routes = Router();

const login = require('./login');

/**
 * GET home page
 */
routes.get('/', (req, res) => {
    console.log('bb');
    res.send('working');
  });

// middlewares
routes.use('/login', login);

module.exports = routes;

