exports.seed = (knex, Promise) => {
  return knex('items').del()
  .then(() => {
    return knex('items').insert([
      {
        id: 1,
        name: 'Backpack',
        reason: 'Might use it later',
        cleanliness: 'Dusty'

      },
      {
        id: 2,
        name: 'Chritmas Tree',
        reason: 'Waiting for holiday season',
        cleanliness: 'Sparkling'

      },
      {
        id: 3,
        name: 'Bicycle',
        reason: 'Garage is the right place for it',
        cleanliness: 'Dusty'
      },
      {
        id: 4,
        name: 'Wine',
        reason: 'Aging it for a better taste in the future',
        cleanliness: 'Rancid'
      }
    ]);
  });
};
