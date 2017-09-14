const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('port', process.env.PORT || 3000);

app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html')
});

app.listen(app.get('port'), () => {
  console.log(`The App is running on ${app.get('port')}.`);
});
