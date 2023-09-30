const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');


const register = asyncHandler(async (req, res) => {
  res.status(200).json({message: "userController@register"});
})


const login = asyncHandler(async (req, res) => {
  res.status(400);
  throw new Error('sample error');
  // res.status(200).json({message: "userController@login"});
})


const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({message: "userController@getMe"});
})

const userController = {register, login, getMe};

module.exports = userController;

