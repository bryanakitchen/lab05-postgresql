const pool = require('../utils/pool');

module.exports = class Food {
    id;
    dish;
    countryOfOrigin;
    spiceLevel;

    constructor(row) {
      this.id = row.id;
      this.dish = row.dish;
      this.countryOfOrigin = row.country_of_origin;
      this.spiceLevel = row.spice_level;
    }

    static async find() {
      const { rows } = await pool.query('SELECT * FROM foods');

      return rows.map(row => new Food(row));
    }

    static async insert({ dish, countryOfOrigin, spiceLevel }) {
      const { rows } = await pool.query(
        'INSERT INTO foods (dish, country_of_origin, spice_level) VALUES ($1, $2, $3) RETURNING *',
        [dish, countryOfOrigin, spiceLevel]
      );
      return new Food(rows[0]);
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM foods WHERE id=$1',
        [id]
      );
        
      if(!rows[0]) throw new Error(`No dish with such id (${id})`);
      
      return new Food(rows[0]);
    }

    static async update(id, { dish, countryOfOrigin, spiceLevel }) {
      const { rows } = await pool.query(
        `UPDATE foods
          SET dish=$1,
            country_of_origin=$2
            spice_level=$3
          WHERE id=$4
          RETURNING *`,
        [dish, countryOfOrigin, spiceLevel, id]
      );

      return new Food(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM foods WHERE id=$1 RETURNING *',
        [id]
      );

      return new Food(rows[0]);
    }
};
