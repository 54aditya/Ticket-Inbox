import { z } from "zod";

export const createNoteSchema = z.object({
  text: z.string().min(1, "Note text is required"),
});
