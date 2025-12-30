import { Router } from "express";
import {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
} from "../controllers/ticket.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.js";
import {
  createTicketSchema,
  updateTicketSchema,
} from "../validations/ticket.validation.js";

const router = Router();

router.post("/create", validate(createTicketSchema), createTicket);
router.get("/", getAllTickets);
router.get("/:id", getTicketById);
router.patch("/:id", validate(updateTicketSchema), updateTicket);
router.delete("/:id", deleteTicket);

export default router;
