const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler'); // needed because mongoose and brcypt are both promise-based

const User = require('../models/userModel');


const register = asyncHandler(async (req, res) => {
  console.log('userController@regiser')
  const {name, email, password} = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please ensure all fields are filled out');
  }
  
  const userExists = await User.findOne({email})
  if(userExists) {
    res.status(400);
    throw new Error(`${email} is already associated with a user`);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201);
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error(`Unable to create user`);
  }

})


const login = asyncHandler(async (req, res) => {
  console.log('userController@login');
  const {email, password} = req.body;
  console.log(req.body);
  
  if (!email || !password) {
    res.status(400);
    throw new Error('Please ensure all fields are filled out');
  }

  const user = await User.findOne({email});

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200);
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });    
  } else {
    res.status(400);
    throw new Error('Incorrect credentials');
  }
})


const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({message: "userController@getMe"});
})

const userController = {register, login, getMe};

module.exports = userController;

