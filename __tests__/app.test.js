const fs = require('fs');
const app = require('../lib/app');
const request = require('supertest');
const pool = require('../lib/utils/pool');
const Artist = require('../lib/models/Artist');

describe('app routes for Artist model', () => {
    
  beforeAll(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  it('adds one artist', async () => {
                
    const data = await request(app)
      .post('/artists')
      .send({
        artist: 'Big Gigantic',
        genre: 'electronica',
      });
                    
    expect(data.body).toEqual({
      id: '1',
      artist: 'Big Gigantic',
      genre: 'electronica',
    });
  });
    
  it('Returns all artists', async () => {
        
    const data = await request(app)
      .get('/artists');
        
    expect(data.body).toEqual([{
      id: '1',
      artist: 'Big Gigantic',
      genre: 'electronica',
    }]);
  });

  it('returns one artist', async () => {
  
    const data = await request(app)
      .get('/artists/1');
      
    expect(data.body).toEqual({
      id: '1',
      artist: 'Big Gigantic',
      genre: 'electronica',

    });
  });


  it('updates one artist', async() => {
    const artist = await Artist.insert({ artist: 'Griz', genre: 'funk' });

    const data = await request(app)
      .put(`/artists/${artist.id}`)
      .send({
        artist: 'Griz',
        genre: 'funk',
      });

    expect(data.body).toEqual({
      ...artist,
      artist: 'Griz',
      genre: 'funk',
    });
  });
  
  it('deletes one artist', async() => {

    const data = await request(app)
      .put('/artists/1')
      .send({
        artist: 'Griz',
        genre: 'funk',
      });

    expect(data.body).toEqual({
      id: '1',
      artist: 'Griz',
      genre: 'funk',
    });
  });

});
