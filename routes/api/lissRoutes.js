const router = require('express').Router();
const LISS = require('../../models/LISS');

router.get('/', async (req, res) => {
    try {
      const lissData = await LISS.findAll();
      res.status(200).json(lissData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;