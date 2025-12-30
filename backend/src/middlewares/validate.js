import { ZodError } from "zod";
import express from "express";
const app=express();
app.use(express.json());


export const validate = (schema) => (req, res, next) => {
  if (!schema) return res.status(500).json({ error: "Validation schema not provided" });
  try {
    schema.parse(req.body); 
    console.log(2);// Zod parse
    next();
  } catch (err) {
    // check if it's a ZodError
    // if (err instanceof ZodError) {
      const errors = err.errors?.map(e => ({
        field: e.path.join("."),
        message: e.message,
      })) || []; // fallback to empty array
      return res.status(400).json({
        message: "Validation error",
        errors,
      });
    // }

    // for any other errors
    // console.error(err);
    return res.status(500).json({ message: "Server error during validation" });
  }
};
