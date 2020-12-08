const pool = require('../utils/pool');

module.exports = class Car {
    id;
    make;
    model;
    year;

    constructor(row) {
      this.id = row.id;
      this.make = row.make;
      this.model = row.model;
      this.year = row.year;
    }

    static async find() {
      const { rows } = await pool.query('SELECT * FROM cars');

      return rows.map(row => new Car(row));
    }

    static async insert({ make, model, year }) {
      const { rows } = await pool.query(
        'INSERT INTO cars (make, model, year) VALUES ($1, $2, $3) RETURNING *',
        [make, model, year]
      );
      return new Car(rows[0]);
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM cars WHERE id=$1',
        [id]
      );
        
      if(!rows[0]) throw new Error(`No car with such id (${id})`);
      
      return new Car(rows[0]);
    }

    static async update(id, { make, model, year }) {
      const { rows } = await pool.query(
        `UPDATE cars
          SET make=$1,
            model=$2,
            year=$3
          WHERE id=$4
          RETURNING *`,
        [make, model, year, id]
      );

      return new Car(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM cars WHERE id=$1 RETURNING *',
        [id]
      );

      return new Car(rows[0]);
    }
};
