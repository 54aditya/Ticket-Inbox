import { z } from "zod";

export const createTicketSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(5),
  customer_email: z.string().email()
});

export const updateTicketSchema = z.object({
  status: z.enum(["open", "pending", "resolved"]).optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
});
