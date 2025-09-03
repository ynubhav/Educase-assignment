import { pool } from "../configs/db.config.js";
import { v4 as uuidv4 } from "uuid";

const createNewSchool = async (name,address,latitude,longitude)=>{

    const id = uuidv4(); // generate UUID in app

    await pool.execute(
      `INSERT INTO schools (id, name, address, latitude, longitude)
     VALUES (?, ?, ?, ?, ?)`,
      [id, name, address, latitude, longitude]
    );

    const SchoolInfo={id,name,address,latitude,longitude};

    return SchoolInfo;
}

export { createNewSchool }