const express = require('express');
const router = express.Router();
const Score = require('../models/score');

router.post('/', async (req, res) => {
  try {
    const { player, clicks } = req.body;
    const score = new Score({ player, clicks });
    await score.save();
    res.status(201).json(score);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const scores = await Score.find().sort({ clicks: -1 }).limit(10);
    res.json(scores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
