const jwt = require('jsonwebtoken');

const checkAuth = async (req, res, next) => {
  const token = req.header('x-auth');
  // validate if token is empty of undefined
  if (!token || typeof token === undefined) {
    res.status(401).json({message: 'Invalid Token'});
    return;
  }

  try {
    // decode token
    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = decode;
    next();

  } catch (err) {

    console.log(err);
    // validate if token expired
    if (err.name === 'TokenExpiredError') {
      res.status(401).json({ message: 'Token Expired' });
      return;
    }
    
    if (err.name === 'JsonWebTokenError') {
      res.status(401).json({ message: 'Invalid Token' });
      return;
    }
    res.status(500).json({ message: 'Something went wrong' });
    return;
  }
};

module.exports = checkAuth;
