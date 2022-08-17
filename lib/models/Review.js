const pool = require('../utils/pool');

module.exports = class Review {
  

  constructor(row) {
    this.users_id = row.users_id;
    this.restaurant_id = row.restaurant_id;
    this.rating = row.rating;
    this.comment = row.comment;
  }

  static async deleteReview({ id }) {
    const { rows } = await pool.query(`
        DELETE FROM users_restaurants
        WHERE id = $1
        RETURNING *`, 
    [id]);
    return new Review(rows[0]);
  }};
