const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);

app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html')
});

app.get('/api/v1/items', (request, response) => {
  database('items').select()
  .then(items => {
    response.status(200).json(items);
  })
  .catch(error => {
    response.status(500).json(error)
  })
})

app.get('/api/v1/items/:id', (request, response) => {
  database('items').where('id', request.params.id).select()
    .then(items => {
      if (items.length) {
        response.status(200).json(items);
      } else {
        response.status(404).json({
          error: `Could not find item with id of ${request.params.id}`
        })
      }
    })
    .catch(error => {
      response.status(500).json(error)
    });
});

app.post('/api/v1/items', (request, response) => {
  const newItem = {
    name: request.body.name,
    reason: request.body.reason,
    cleanliness: request.body.cleanliness
  }

  for(let requiredParameter of ['name', 'cleanliness']) {
    if (!newItem[requiredParameter]) {
      return response.status(422).json({
        error: `Missing required parameter ${requiredParameter}`
      });
    }
  }

  database('items').insert(newItem, '*')
    .then(item => {
      response.status(201).json({ id: item[0] })
    })
    .catch(error => {
      response.status(500).json({ error })
  })
});

app.listen(app.get('port'), () => {
  console.log(`The App is running on ${app.get('port')}.`);
});

module.exports = app;
