const login = require('express').Router();
const pool = require('../db');
const sendResponse = require('../helpers/sendResponse');

login.route('/').post(async (req, res) => {
    console.log(req.body);
    
    try {
        // get loggedin userId
        const { userId } = req.user;

        const { userName, userEmail } = req.body;

        // object of post
        const post = {
            userName,
            userEmail,
        };

        await pool.query('INSERT INTO blogs SET ? ', post);

        return sendResponse(res, 200, [], 'posted successful');
    } catch (err) {
        console.error(err);
        return sendResponse(res, 500, [], 'something went wrong');
    }
});