const pool = require('../utils/pool');

module.exports = class City {
    id;
    city;
    state;

    constructor(row) {
      this.id = row.id;
      this.city = row.city;
      this.state = row.state;
    }

    static async find() {
      const { rows } = await pool.query('SELECT * FROM cities');

      return rows.map(row => new City(row));
    }

    static async insert({ city, state }) {
      const { rows } = await pool.query(
        'INSERT INTO cities (city, state) VALUES ($1, $2) RETURNING *',
        [city, state]
      );
      return new City(rows[0]);
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM cities WHERE id=$1',
        [id]
      );

      if(!rows[0]) throw new Error(`No city with such id (${id})`);
      
      return new City(rows[0]);
    }

    static async update(id, { city, state }) {
      const { rows } = await pool.query(
        `UPDATE cities
          SET city=$1,
            state=$2
          WHERE id=$3
          RETURNING *`,
        [city, state, id]
      );

      return new City(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM cities WHERE id=$1 RETURNING *',
        [id]
      );

      return new City(rows[0]);
    }
};
