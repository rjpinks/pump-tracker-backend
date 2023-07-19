const router = require('express').Router();
const HIIT = require('../../models/HIIT');

router.get('/', async (req, res) => {
    try {
      const hiitData = await HIIT.findAll();
      res.status(200).json(hiitData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;