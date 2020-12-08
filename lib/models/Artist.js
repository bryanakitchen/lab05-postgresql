const pool = require('../utils/pool');

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

    static async insert({ artist, genre }) {
      const { rows } = await pool.query(
        'INSERT INTO artists (artist, genre) VALUES ($1, $2) RETURNING *',
        [artist, genre]
      );
      return new Artist(rows[0]);
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM artists WHERE id=$1',
        [id]
      );

      if(!rows[0]) throw new Error(`No Artist with such id (${id})`);
      
      return new Artist(rows[0]);
    }

    static async update(id, { artist, genre }) {
      const { rows } = await pool.query(
        `UPDATE artists
          SET artist=$1,
            genre=$2
          WHERE id=$3
          RETURNING *`,
        [artist, genre, id]
      );

      return new Artist(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM artists WHERE id=$1 RETURNING *',
        [id]
      );

      return new Artist(rows[0]);
    }
};
