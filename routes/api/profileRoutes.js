const router = require('express').Router();
const Profile = require('../../models/Profile');

router.get('/', async (req, res) => {
    try {
      const strengthData = await Profile.findAll();
      res.status(200).json(strengthData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;