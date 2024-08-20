// controllers/watchlistController.js
const db = require('../config/db');

exports.getWatchlist = (req, res) => {
  const userId = req.user.id;

  db.query('SELECT * FROM watchlist WHERE user_id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error fetching watchlist:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.json(results);
  });
};

exports.addToWatchlist = (req, res) => {
  const { movie_id, movie_title, movie_poster } = req.body;
  const userId = req.user.id;

  db.query(
    'INSERT INTO watchlist (user_id, movie_id, movie_title, movie_poster) VALUES (?, ?, ?, ?)',
    [userId, movie_id, movie_title, movie_poster],
    (err, result) => {
      if (err) {
        console.error('Error adding movie to watchlist:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      res.status(201).json({ message: 'Movie added to watchlist' });
    }
  );
};

exports.removeFromWatchlist = (req, res) => {
  const userId = req.user.id;
  const watchlistId = req.params.id;

  db.query(
    'DELETE FROM watchlist WHERE user_id = ? AND id = ?',
    [userId, watchlistId],
    (err, result) => {
      if (err) {
        console.error('Error removing movie from watchlist:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Movie not found in watchlist' });
      }
      res.status(200).json({ message: 'Movie removed from watchlist' });
    }
  );
};

