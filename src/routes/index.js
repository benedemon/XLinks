import { Router } from 'express';
const routes = Router();
const { checkAuth} = require('../middlewares');
const login = require('./login');
const addLink = require('./addLink');
const updateLink = require('./updateLink');
const deleteLink = require('./deleteLink');
const getLinks = require('./getLinks');

/**
 * GET home page
 */
routes.get('/', (req, res) => {
    res.send('working');
  });

// middlewares
routes.use('/login',checkAuth, login);
routes.use('/addLink',addLink);
routes.use('/updateLink',updateLink);
routes.use('/deleteLink',deleteLink);
routes.use('/getLinks',getLinks);
module.exports = routes;

