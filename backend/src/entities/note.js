import { EntitySchema } from "typeorm";

export const Note = new EntitySchema({
  name: "Note",
  tableName: "notes",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    text: {
      type: "text",
    },
    created_at: {
      type: "timestamp",
      createDate: true,
    },
  },
  relations: {
    ticket: {
      type: "many-to-one",
      target: "Ticket",
      joinColumn: { name: "ticket_id" },
      onDelete: "CASCADE",
    },
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: { name: "user_id" },
      onDelete: "CASCADE",
    },
  },
});
