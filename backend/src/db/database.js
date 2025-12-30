import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

import { User } from "../entities/user.js";
import { Ticket } from "../entities/ticket.js";
import { Note } from "../entities/note.js";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [User, Ticket, Note],
  synchronize: true,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

