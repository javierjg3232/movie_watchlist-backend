// backend/routes/watchlistRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const watchlistController = require('../controllers/watchlistController');

// Routes
router.get('/', authMiddleware.protect, watchlistController.getWatchlist);
router.post('/', authMiddleware.protect, watchlistController.addToWatchlist);
router.delete('/:id', authMiddleware.protect, watchlistController.removeFromWatchlist);

module.exports = router;

