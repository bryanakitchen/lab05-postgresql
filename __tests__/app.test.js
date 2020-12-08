require('dotenv').config();

const app = require('../lib/app');
const fakeRequest = require('supertest');
// const artists = require('./data.js');

describe('app routes for Artist model', () => {
    
  it('Returns all artists', async () => {
        
    const expectation = [
      {
        id: 1,
        artist: 'Griz',
        genre: 'electronica',
      },
      {
        id: 2,
        artist: 'Above & Beyond',
        genre: 'trance',
      },
      {
        id: 3,
        artist: 'Disclosure',
        genre: 'house',
      }
    ];

    const data = await fakeRequest(app)
      .get('/artists')
      .expect('Content-Type', /json/)
      .expect(200);
        
    expect(data.body).toEqual(expectation);
  });

  it('returns one artist', async () => {

    const expectation = 
        {
          id: 1,
          artist: 'Griz',
          genre: 'electronica',
        };
  
    const data = await fakeRequest(app)
      .get('/artists/1')
      .expect('Content-Type', /json/)
      .expect(200);
      
    expect(data.body).toEqual(expectation);
  });

  it('adds one artist', async () => {

    const expectation = 
        {
          id: 4,
          artist: 'Big Gigantic',
          genre: 'electronica',
        };
  
    const data = await fakeRequest(app)
      .post('/artists')
      .send({
        id: 4,
        artist: 'Big Gigantic',
        genre: 'electronica',
      })
      .expect('Content-Type', /json/)
      .expect(200);

    const allArtists = await fakeRequest(app)
      .get('/artists')
      .expect('Content-Type', /json/)
      .expect(200);

      
    expect(data.body).toEqual(expectation);
    expect(allArtists.body.length).toEqual(4);
  });

  it('updates one artist', async() => {

    const expectation =
      {
        id: 1,
        name: 'Griz',
        genre: 'funk',
      };

    const data = await fakeRequest(app)
      .put('/artists/1')
      .send({
        name: 'Griz',
        genre: 'funk',
        id: 1
      })
      .expect('Content-Type', /json/)
      .expect(200);

    const allArtists = await fakeRequest(app)
      .get('/artists')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(expectation);
    expect(allArtists.body.length).toEqual(4);
  });
  
  it('deletes one artist', async() => {

    const expectation =
      {
        id: 4,
        artist: 'Big Gigantic',
        genre: 'electronica',
      };

    const data = await fakeRequest(app)
      .put('/artists/4')
      .send({
        artist: 'Big Gigantic',
        genre: 'electronica',
        id: 4
      })
      .expect('Content-Type', /json/)
      .expect(200);

    const allArtists = await fakeRequest(app)
      .get('/artists')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(expectation);
    expect(allArtists.body.length).toEqual(3);
  });
  

});
