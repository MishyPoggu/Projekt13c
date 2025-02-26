const Addresses = require('./addresses');
const Advertisements = require('./advertisements');
const Companies = require('./companies');

Advertisements.belongsTo(Addresses, {
    foreignKey: 'addressId',
    targetKey: 'addressId',
    onDelete: 'CASCADE',
});

Addresses.hasMany(Advertisements, {
    foreignKey: 'addressId',
    sourceKey: 'addressId',
    onDelete: 'CASCADE',
});

Advertisements.belongsTo(Companies, {
    foreignKey: 'companyName',
    targetKey: 'companyName',
    onDelete: 'CASCADE',
});
