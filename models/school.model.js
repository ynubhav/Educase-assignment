import { pool } from "../configs/db.config.js";

const initDB = async function () {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS schools (
      id CHAR(36) NOT NULL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(500) NOT NULL,
      latitude DECIMAL(9,6) NOT NULL,
      longitude DECIMAL(9,6) NOT NULL,
      lat_rounded DECIMAL(9,4) AS (ROUND(latitude, 4)) STORED,
      lng_rounded DECIMAL(9,4) AS (ROUND(longitude, 4)) STORED,
      CONSTRAINT unique_location UNIQUE (lat_rounded, lng_rounded)
    )
  `);

  console.log("Table 'schools' is ready.");
};

export { initDB };
