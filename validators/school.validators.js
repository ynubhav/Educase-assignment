import z from "zod";

//validation schema for adding a school
const AddSchoolValidator = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be less than 100 characters" }),
  address: z
    .string()
    .min(10, { message: "Address must be at least 10 characters" })
    .max(200, { message: "Address must be less than 200 characters" }),
  latitude: z
    .number()
    .min(-90, { message: "Latitude must be >= -90" })
    .max(90, { message: "Latitude must be <= 90" }),
  longitude: z
    .number()
    .min(-180, { message: "Longitude must be >= -180" })
    .max(180, { message: "Longitude must be <= 180" }),
});

// validation  schema for params  to list schools in vicinity
// coerce them to number because of query params used
const GetSchoolValidator = z.object({
  lat: z.coerce
    .number()
    .min(-90, { message: "Latitude must be >= -90" })
    .max(90, { message: "Latitude must be <= 90" }),
  lng: z.coerce
    .number()
    .min(-180, { message: "Longitude must be >= -180" })
    .max(180, { message: "Longitude must be <= 180" }),
});

export { AddSchoolValidator, GetSchoolValidator };
