

const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler( async (req, res, next) => {

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      // req.user = await User.findOne({id: decodedToken.id}).select('-password') // to get user without the pwd hash
      req.user = await User.findById(decodedToken.id).select('-password') // to get user without the pwd hash
      next(); // move on
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized')
    }
  } else {
    res.status(401);
    throw new Error('Not authorized. Please provide a token.')
  }

});

module.exports = { protect };