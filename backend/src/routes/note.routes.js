import { Router } from "express";
import { createNote, getNotesByTicket } from "../controllers/note.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.js";
import { createNoteSchema } from "../validations/note.validation.js";

const router = Router();

router.post("/tickets/:id/notes", authenticate, validate(createNoteSchema), createNote);
router.get("/tickets/:id/notes", getNotesByTicket);

export default router;
