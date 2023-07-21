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

    req.session.save(() => {
      req.session.user_id = profileData.id;
      req.session.logged_in = true;

      res.status(200).json(profileData);
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const profileData = await Profile.findOne({ where: { email: req.body.email } });

    if (!profileData) {
      res.status(404).json({ message: 'Incorrect email or password' });
      return;
    }

    const validPassword = await profileData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(404).json({ message: 'Incorrect email or password' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = profileData.id;
      req.session.logged_in = true;

      res.json({ user: profileData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

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