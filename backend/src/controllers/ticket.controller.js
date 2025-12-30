import { AppDataSource } from "../db/database.js";
import { Ticket } from "../entities/ticket.js";
import { sendError } from "../utils/errorResponse.js";
import { ILike } from "typeorm";

const ticketRepo = AppDataSource.getRepository(Ticket);

export const createTicket = async (req, res) => {
  try {
    const { title, description, customer_email, priority } = req.body;

    if (!title || !description || !customer_email) {
      return sendError(res, 400, "Required fields are missing");
    }

    const ticket = ticketRepo.create({
      title,
      description,
      customer_email,
      priority,
    });

    await ticketRepo.save(ticket);

    return res.status(201).json({
      message: "Ticket created successfully",
      ticket,
    });
  } catch (error) {
    console.error(error);
    return sendError(res, 500, "Failed to create ticket");
  }
};

export const getAllTickets = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { search, status, priority } = req.query;

    let where = [{ deleted_at: null }];

    if (status) {
      where[0].status = status;
    }

    if (priority) {
      where[0].priority = priority;
    }

    if (search) {
      where = [
        {
          deleted_at: null,
          status,
          priority,
          title: ILike(`%${search}%`),
        },
        {
          deleted_at: null,
          status,
          priority,
          description: ILike(`%${search}%`),
        },
        {
          deleted_at: null,
          status,
          priority,
          customer_email: ILike(`%${search}%`),
        },
      ];
    }

    const [tickets, total] = await ticketRepo.findAndCount({
      where,
      order: { created_at: "DESC" },
      skip,
      take: limit,
    });

    return res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      filters: {
        search: search || null,
        status: status || null,
        priority: priority || null,
      },
      tickets,
    });
  } catch (error) {
    console.error(error);
    return sendError(res, 500, "Failed to fetch tickets");
  }
};

export const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await ticketRepo.findOne({
      where: { id, deleted_at: null },
      relations: ["notes"],
    });

    if (!ticket) {
      return sendError(res, 404, "Ticket not found");
    }

    return res.json(ticket);
  } catch (error) {
    console.error(error);
    return sendError(res, 500, "Failed to fetch ticket");
  }
};

export const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, priority } = req.body;

    const ticket = await ticketRepo.findOne({
      where: { id, deleted_at: null },
    });

    if (!ticket) {
      return sendError(res, 404, "Ticket not found");
    }

    if (status) ticket.status = status;
    if (priority) ticket.priority = priority;

    await ticketRepo.save(ticket);

    return res.json({
      message: "Ticket updated successfully",
      ticket,
    });
  } catch (error) {
    console.error(error);
    return sendError(res, 500, "Failed to update ticket");
  }
};

export const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await ticketRepo.findOne({
      where: { id, deleted_at: null },
    });

    if (!ticket) {
      return sendError(res, 404, "Ticket not found");
    }

    ticket.deleted_at = new Date();
    await ticketRepo.save(ticket);

    return res.json({
      message: "Ticket deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return sendError(res, 500, "Failed to delete ticket");
  }
};
