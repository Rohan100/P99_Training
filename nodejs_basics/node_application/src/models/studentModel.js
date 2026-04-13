const pool = require('../config/db');


const StudentModel = {
  async getAll() {
    const result = await pool.query(
      'SELECT * FROM students ORDER BY created_at DESC'
    );
    return result.rows;
  },

  async getById(id) {
    const result = await pool.query(
      'SELECT * FROM students WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  },

  async create({ first_name, last_name, email, phone, age, course }) {
    const result = await pool.query(
      `INSERT INTO students (first_name, last_name, email, phone, age, course)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [first_name, last_name, email, phone || null, age || null, course || null]
    );
    return result.rows[0];
  },

  async update(id, { first_name, last_name, email, phone, age, course }) {
    const result = await pool.query(
      `UPDATE students
       SET first_name = $1,
           last_name  = $2,
           email      = $3,
           phone      = $4,
           age        = $5,
           course     = $6
       WHERE id = $7
       RETURNING *`,
      [first_name, last_name, email, phone || null, age || null, course || null, id]
    );
    return result.rows[0] || null;
  },

  /** Delete a student */
  async delete(id) {
    const result = await pool.query(
      'DELETE FROM students WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0] || null;
  },
};

module.exports = StudentModel;
