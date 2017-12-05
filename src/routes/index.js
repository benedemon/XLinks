import { Router } from 'express';
const routes = Router();

const login = require('./login');
const addLink = require('./addLink');
const updateLink = require('./updateLink');
const deleteLink = require('./deleteLink');
const showLinks = require('./showLinks');
/**
 * GET home page
 */
routes.get('/', (req, res) => {
    console.log('bb');
    res.send('working');
  });

// middlewares
routes.use('/login', login);
routes.use('/addLink',addLink);
routes.use('/updateLink',updateLink);
routes.use('/deleteLink',deleteLink);
routes.use('/showLinks',showLinks);
module.exports = routes;

