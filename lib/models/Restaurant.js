
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
  
  
  
  static async insert({ name, city, address }) {
    const { rows } = await pool.query(
      'INSERT INTO restaurants(name, city, address) VALUES ($1, $2, $3) RETURNING *',
      [name, city, address] 
    );
    return new Restaurant(rows[0]);
  }


  static async getRestaurantById(id) {
    const { rows } = await pool.query(
      `SELECT restaurants.*,
      COALESCE(json_agg(to_jsonb(users_restaurants))
            FILTER (WHERE users_restaurants.id IS NOT NULL), '[]')
            as reviews from restaurants
            LEFT JOIN users_restaurants on restaurants.id = users_restaurants.restaurants_id
            WHERE restaurants.id = $1
            GROUP BY restaurants.id`,
      [id]
    );
    if (!rows[0]) return null;
    return new Restaurant(rows[0]);
  }

  async addReview({ users_id, restaurants_id, rating, comment }) {
    const { rows } = await pool.query(
      `INSERT INTO users_restaurants(users_id, restaurants_id, rating, comment) 
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [users_id, restaurants_id, rating, comment]
    );
    return rows[0];
  }
  



  
};
