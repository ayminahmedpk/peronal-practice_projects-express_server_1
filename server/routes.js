

const express = require('express');
const router = express.Router();

const userRoutes = require('./routes/userRoutes');

const {protect} = require('./middleware/authMiddleware');


router.get('/', protect, (req, res) => {res.status(200).json({message: 'home page'})});

router.use('/users', userRoutes);

module.exports = router;

