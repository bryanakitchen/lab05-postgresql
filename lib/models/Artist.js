const pool = require('../utils.pool');

module.exports = class Artist {
    id;
    artist;
    genre;

    constructor(row) {
      this.id = row.id;
      this.artist = row.artist;
      this.genre = row.genre;
    }

    static async find() {
      const { rows } = await pool.query('SELECT * FROM artists');

      return rows.map(row => new Artist(row));
    }

  // static async insert({ artist, genre }) {
  //     const { rows } = await pool.query(
  //         ''
  //     );
  // }

};
