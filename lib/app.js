const express = require('express');
const app = express();
const Artist = require('./models/Artist');

app.use(express.json());

app.get('/', (req, res) => {
//   console.log(req.body);
  res.send('Hello world');
});

app.get('/artists', (req, res) => {
  Artist
    .find()
    .then(artists => res.send(artists));
});

app.post('/artists', (req, res) => {
//   const artist = await new Artist(req.body);
//   res.send(artist)
  Artist
    .insert(req.body)
    .then(artist => res.send(artist));
});
  

module.exports = app;
