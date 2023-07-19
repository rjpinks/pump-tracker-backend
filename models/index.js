const Strength = require('./Strength');
const LISS = require('./LISS');
const HIIT = require('./HIIT');
const Profile = require('./Profile');

Profile.hasMany(LISS, {
    foreignKey: 'profile_id',
    onDelete: 'CASCADE'
});

LISS.belongsTo(Profile, {
    foreignKey: 'profile_id'
});

Profile.hasMany(Strength, {
    foreignKey: 'profile_id',
    onDelete: 'CASCADE'
});

Strength.belongsTo(Profile, {
    foreignKey: 'profile_id'
});

Profile.hasMany(HIIT, {
    foreignKey: 'profile_id',
    onDelete: 'CASCADE'
});

HIIT.belongsTo(Profile, {
    foreignKey: 'profile_id'
});

module.exports = {
    Strength,
    LISS,
    HIIT,
    Profile
};