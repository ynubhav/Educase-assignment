import { pool } from "../configs/db.config.js";

const getNearestSchools = async (userLat, userLng) => {
  const sql = `
    SELECT
      id, name, address, latitude, longitude,
      (6371 * ACOS(
        COS(RADIANS(?)) * COS(RADIANS(latitude)) * COS(RADIANS(longitude) - RADIANS(?))
        + SIN(RADIANS(?)) * SIN(RADIANS(latitude))
      )) AS distance_km
    FROM schools
    ORDER BY distance_km ASC
  `;

  const [rows] = await pool.execute(sql, [userLat, userLng, userLat]);

  const formatted = rows.map((r) => ({
    id: r.id,
    name: r.name,
    address: r.address,
    latitude: Number(r.latitude),
    longitude: Number(r.longitude),
    distance_km: Number(Number(r.distance_km).toFixed(4)),
  }));

  return formatted;
};

export { getNearestSchools };
