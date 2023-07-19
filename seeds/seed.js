const sequelize = require('../config/connection');
const { Profile, HIIT, LISS, Strength } = require('../models');

const hiitSeedData = require('./hiitSeedData.json');
const lissSeedData = require('./lissSeedData.json');
const profileSeedData = require('./profileSeedData.json');
const strengthSeedData = require('./strengthSeedData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    
    const profile = await Profile.bulkCreate(profileSeedData);
    const hiit = await HIIT.bulkCreate(hiitSeedData);
    const liss = await LISS.bulkCreate(lissSeedData);
    const strength = await Strength.bulkCreate(strengthSeedData);

    process.exit(0);
};

seedDatabase();
