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

router.get('/:id', async (req, res) => {
  try {
    const profileData = await Profile.findByPk(req.params.id)

    if (!profileData) { res.status(404).json({ message: 'You done goofed' }); }

    res.status(200).json(profileData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const profileData = await Profile.create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    });

    // req.session.save(() => {
    //   req.session.user_id = userData.id;
    //   req.session.logged_in = true;

    //   res.status(200).json(userData);
    // });
    res.status(200).json(profileData);

  } catch (err) {
    res.status(500).json(err);
  }
});

/* login post call will be made here */

router.put('/:id', async (req, res) => {
  try {
    const profileToUpdate = await Profile.findOne({ where: { id: req.params.id } });

    if (!profileToUpdate) {
      res.status(404).json({ message: 'Account not found bro' });
    }
      profileToUpdate.email = req.body.email;
      profileToUpdate.username = req.body.username;
      profileToUpdate.password = req.body.password;

    // Save the changes to trigger the beforeUpdate hook
    await profileToUpdate.save();

    res.status(200).json(profileToUpdate)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const profileData = await Profile.destroy({
      where: { id: req.params.id }
    });

    if (!profileData) {
      res.status(404).json({ message: "Can't delete what you can't touch 🥊" });
    }

    res.status(200).json(profileData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;