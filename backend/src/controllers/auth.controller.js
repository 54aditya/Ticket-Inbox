import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../db/database.js";
import { User } from "../entities/user.js";
import { sendError } from "../utils/errorResponse.js";

const userRepo = AppDataSource.getRepository(User);


export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return sendError(res, 400, "All fields are required");
    }

    const existingUser = await userRepo.findOne({ where: { email } });
    if (existingUser) {
      return sendError(res, 409, "Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = userRepo.create({
      name,
      email,
      password_hash: hashedPassword,
    });

    await userRepo.save(user);

    return res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    return sendError(res, 500, "Registration failed");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log(2);
      return sendError(res, 400, "Email and password required");
    }

    const user = await userRepo.findOne({ where: { email } });
    if (!user) {
      return sendError(res, 401, "Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return sendError(res, 401, "Invalid credentials");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    return sendError(res, 500, "Login failed");
  }
};
