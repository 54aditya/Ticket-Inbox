import { AppDataSource } from "../db/database.js";
import { Note } from "../entities/note.js";
import { Ticket } from "../entities/ticket.js";
import { sendError } from "../utils/errorResponse.js";

const noteRepo = AppDataSource.getRepository(Note);
const ticketRepo = AppDataSource.getRepository(Ticket);

export const createNote = async (req, res) => {
  try {
    const { id } = req.params; 
    const { text } = req.body;
    const user = req.user; 

    if (!text) {
      return sendError(res, 400, "Note text is required");
    }

    const ticket = await ticketRepo.findOne({
      where: { id, deleted_at: null },
    });

    if (!ticket) {
      return sendError(res, 404, "Ticket not found");
    }

    const note = noteRepo.create({
      text,
      ticket,
      user: { id: user.id },
    });

    await noteRepo.save(note);

    return res.status(201).json({
      message: "Note added successfully",
      note,
    });
  } catch (error) {
    console.error(error);
    return sendError(res, 500, "Failed to add note");
  }
};

export const getNotesByTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await ticketRepo.findOne({
      where: { id, deleted_at: null },
    });

    if (!ticket) {
      return sendError(res, 404, "Ticket not found");
    }

    const notes = await noteRepo.find({
      where: { ticket: { id } },
      relations: ["user"],
      order: { created_at: "DESC" },
    });

    return res.json({
      ticketId: id,
      total: notes.length,
      notes,
    });
  } catch (error) {
    console.error(error);
    return sendError(res, 500, "Failed to fetch notes");
  }
};
