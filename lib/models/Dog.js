const pool = require('../utils/pool');

module.exports = class Dog {
    id;
    dog;
    age;
    ownerName;

    constructor(row) {
      this.id = row.id;
      this.dog = row.dog;
      this.age = row.age;
      this.ownerName = row.owner_name;
    }

    static async find() {
      const { rows } = await pool.query('SELECT * FROM dogs');

      return rows.map(row => new Dog(row));
    }

    static async insert({ dog, age, ownerName }) {
      const { rows } = await pool.query(
        'INSERT INTO dogs (dog, age, owner_name) VALUES ($1, $2, $3) RETURNING *',
        [dog, age, ownerName]
      );
      return new Dog(rows[0]);
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM dogs WHERE id=$1',
        [id]
      );

      if(!rows[0]) throw new Error(`No dog with such id (${id})`);
      
      return new Dog(rows[0]);
    }

    static async update(id, { dog, age, ownerName }) {
      const { rows } = await pool.query(
        `UPDATE dogs
          SET dog=$1,
            age=$2,
            owner_name=$3
          WHERE id=$4
          RETURNING *`,
        [dog, age, ownerName, id]
      );

      return new Dog(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM dogs WHERE id=$1 RETURNING *',
        [id]
      );

      return new Dog(rows[0]);
    }
};
