import { Router } from 'express';
const routes = Router();
const { checkAuth} = require('../middlewares');
const login = require('./login');
const addLink = require('./addLink');
const updateLink = require('./updateLink');
const deleteLink = require('./deleteLink');
const getLinks = require('./getLinks');

routes.get('/', (req, res) => {
    res.send('working');
  });

// middlewares
routes.use('/login', login);
routes.use('/addLink', checkAuth, addLink);
routes.use('/updateLink', checkAuth, updateLink);
routes.use('/deleteLink', checkAuth, deleteLink);
routes.use('/getLinks', checkAuth, getLinks);

module.exports = routes;

