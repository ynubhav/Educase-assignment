import { createNewSchool } from "../services/addNewSchool.service.js";
import { getNearestSchools } from "../services/listSchools.service.js";
import {
  AddSchoolValidator,
  GetSchoolValidator,
} from "../validators/school.validators.js";

// add a new school
const addSchool = async (req, res) => {
  try {
    const { success } = AddSchoolValidator.safeParse(req.body); // validate school info

    if (!success) {
      return res
        .status(400)
        .json({ success: false, message: " Invalid Input Body" });
    }

    const { name, address, latitude, longitude } = req.body;

    const Data = await createNewSchool(name, address, latitude, longitude); // create database entry

    return res.status(201).json({
      success: true,
      school: Data,
    });
  } catch (err) {
    if (err.message.includes("Duplicate entry"))
      return res.status(400).json({
        success: false,
        message: "Two Schools cant be in the same location",
      });
    console.error("DB insert error", err.message);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

//list schools based on the distance from person's location
const listSchools = async (req, res) => {
  try {
    const result = GetSchoolValidator.safeParse(req.query); // validate query params

    if (!result.success) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Input Query Params" });
    }

    // using parsed values (already coerced to numbers)
    const { lat: userLat, lng: userLng } = result.data;

    const formatted = await getNearestSchools(userLat, userLng); // array of results

    return res.json({
      success: true,
      count: formatted.length,
      results: formatted,
    });
  } catch (err) {
    console.error("DB query error", err.message);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

export { addSchool, listSchools };
