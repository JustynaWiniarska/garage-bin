const breweryData = require('../../../data.js');

const createBeer = (knex, beer) => {
  return knex('beer').insert(beer);
};

const createBrewery = (knex, brewery) => {
  return knex('brewery').insert({
    name: brewery.name
  }, 'id')
    .then(() => {
      const beerPromises = [];

      brewery.beers.forEach((beer) => {
        beerPromises.push(
          createBeer(knex, {
            name: beer.name,
            style: beer.style,
            size: beer.size,
            abv: beer.abv,
            brewery_id: beer.brewery_id
          })
        );
      });
      return Promise.all(beerPromises);
    });
};

exports.seed = (knex, Promise) => {
  return knex('beer').del()
    .then(() => knex('brewery').del())
    .then(() => {
      const breweryPromises = [];

      breweryData.forEach((brewery) => {
        breweryPromises.push(createBrewery(knex, brewery));
      });

      return Promise.all(breweryPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
