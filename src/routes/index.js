import { Router } from 'express';
const routes = Router();

const login = require('./login');

/**
 * GET home page
 */
routes.get('/', (req, res) => {
    console.log('bb');
    res.render('index', { title: 'Link App' });
  });

// middlewares
routes.use('/login', login);

module.exports = routes;