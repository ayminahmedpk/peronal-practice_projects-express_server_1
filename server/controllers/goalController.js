

const asyncHandler = require('express-async-handler'); // needed because mongoose and brcypt are both promise-based

const Goal = require('../models/goalModel');


const createGoal = asyncHandler(async(req, res) => {
  if(!req.body.text) {
    res.status(400);
    throw new Error("Please insert goal text");
  }

  const goal = await Goal.create({
    text: req.body.text
  })

  res.status(200).json({goal: goal})
});

const listGoals = asyncHandler(async(req, res) => {
  const goals = await Goal.find();
  res.status(200).json(goals);
});

const updateGoal = asyncHandler(async(req, res) => {
  const goal = await Goal.findById(req.params.id);
  
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found. Please verify the provided id.");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true},
  )

  res.status(200).json(updatedGoal);
});


const deleteGoal = asyncHandler(async(req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found. Please verify the provided id.");
  }

  await goal.deleteOne();

  res.status(200).json({id: req.params.id});
});


const goalController = { createGoal, listGoals, updateGoal, deleteGoal };

module.exports = goalController;

