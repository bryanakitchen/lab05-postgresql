const express = require('express');
const app = express();
const Artist = require('./models/Artist');

app.get('/', (req, res) => {
//   console.log(req.body);

  res.send('Hello world');
});

app.get('/artists', (req, res) => {
  Artist
    .find()
    .then(artists => res.send(artists));
});
  

module.exports = app;
