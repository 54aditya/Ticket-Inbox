import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { AppDataSource } from "./db/database.js";
import authRoutes from "./routes/auth.routes.js";
import ticketRoutes from "./routes/ticket.routes.js";
import noteRoutes from "./routes/note.routes.js";
import cors from 'cors';


const app = express();

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173",
    "https://ticket-inbox-2.onrender.com"
  ]
}));


app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.use("/auth", authRoutes);
app.use("/tickets", ticketRoutes);
app.use("/", noteRoutes);


const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(() => {
    console.log(" PostgreSQL connected via TypeORM");

    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(" Database connection failed");
    console.error(error);
    process.exit(1);
  });
