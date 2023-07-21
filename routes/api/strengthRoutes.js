const router = require('express').Router();
const Strength = require('../../models/Strength');

router.get('/', async (req, res) => {
    try {
      const strengthData = await Strength.findAll();
      res.status(200).json(strengthData);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
  try {
    const strengthData = await Strength.findByPk(req.params.id)

    if (!strengthData) {
      res.status(404).json({ message: 'Wrong ID buddy ☹️'});
    }

    res.status(200).json(strengthData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const strengthData = await Strength.create({
      date: req.body.date, /* the front-end needs to pull the date from the browser */
      activity: req.body.activity,
      reps: req.body.reps,
      weight: req.body.weight,
      satisfaction: req.body.satisfaction,
      remarks: req.body.remarks,
      profile_id: req.body.profile_id
    });
    res.status(200).json(strengthData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  Strength.update({
    activity: req.body.activity,
    reps: req.body.reps,
    weight: req.body.weight,
    satisfaction: req.body.satisfaction,
    remarks: req.body.remarks
  },
  {
    where: {
      id: req.params.id
    }
  }
  )
    .then((updatedHiit) => {
      res.json(updatedHiit);
  })
    .catch((err) => res.json(err));
});

router.delete('/:id', async (req, res) => {
  try {
    const strengthData = await Strength.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!strengthData) {
      res.status(404).json({ message: "Can't delete what you can't touch 🥊" });
    }

    res.status(200).json(strengthData);
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;