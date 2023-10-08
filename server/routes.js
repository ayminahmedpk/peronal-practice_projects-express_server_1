

const express = require('express');
const router = express.Router();

const userRoutes = require('./routes/userRoutes');
const goalRoutes = require('./routes/goalRoutes');

const {protect} = require('./middleware/authMiddleware');


router.get('/', protect, (req, res) => {res.status(200).json({message: 'home page'})});


router.use('/users', userRoutes);
router.use('/goals', goalRoutes);

module.exports = router;

