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

router.get('/:id', async (req, res) => {
  try {
    const hiitData = await HIIT.findByPk(req.params.id)

    if (!hiitData) {
      res.status(404).json({ message: 'Wrong ID buddy ☹️'});
    }

    res.status(200).json(hiitData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const hiitData = await HIIT.create({
      date: req.body.date, /* the front-end needs to pull the date from the browser */
      activity: req.body.activity,
      weight: req.body.weight,
      satisfaction: req.body.satisfaction,
      remarks: req.body.remarks,
      profile_id: req.body.profile_id
    });
    res.status(200).json(hiitData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  HIIT.update({
    activity: req.body.activity,
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
    const hiitData = await HIIT.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!hiitData) {
      res.status(404).json({ message: "Can't delete what you can't touch 🥊" });
    }

    res.status(200).json(hiitData);
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;