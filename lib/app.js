const express = require('express');
const app = express();
const Artist = require('./models/Artist');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.get('/artists', (req, res) => {
  Artist
    .find()
    .then(artists => res.send(artists));
});

app.get('/artists/:id', (req, res) => {
  Artist
    .findById(req.params.id)
    .then(artist => res.send(artist));
});

app.post('/artists', (req, res) => {
//   const artist = await new Artist(req.body);
//   res.send(artist)
  Artist
    .insert(req.body)
    .then(artist => res.send(artist));
});

app.put('/artists/:id', (req, res) => {
  Artist
    .update(req.params.id, req.body)
    .then(artist => res.send(artist));
});


  

module.exports = app;
