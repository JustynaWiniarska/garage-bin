const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('port', process.env.PORT || 3000);


app.get('/', (request, response) => {
  response.send('Hi');
});

app.listen(app.get('port'), () => {
  console.log(`The App is running on ${app.get('port')}.`);
});
