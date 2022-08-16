const pool = require('../utils/pool');

module.exports = class Restaurant {
  id;
  name;
  city;
  address;
  reviews;
    

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.city = row.city;
    this.address = row.address;
    this.reviews = row.reviews || [];
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM restaurants');
    return rows.map((row) => new Restaurant(row));
  }
  
  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM restaurants WHERE id=$1', [id]);
    if (!rows[0]) return null;
    
    return new Restaurant(rows[0]);
  }
  
  
  
  static async insert({ reviews, comment }) {
    const { rows } = await pool.query(
      'INSERT INTO restaurants(reviews, comment) VALUES ($1, $2) RETURNING *',
      [reviews, comment] 
    );
    return new Restaurant(rows[0]);
  }


  static async getRestaurantById(id) {
    console.log(id);
    const { rows } = await pool.query(
      `SELECT restaurants.*,
      COALESCE(json_agg(to_jsonb(users_restaurants))
            FILTER (WHERE users_restaurants.id IS NOT NULL), '[]')
            as reviews from users_restaurants
            LEFT JOIN restaurants on restaurants.id = users_restaurants.restaurants_id
            WHERE restaurants.id = $1
            GROUP BY restaurants.id`,
      [id]
    );
    return new Restaurant(rows[0]);
  }
  
};
