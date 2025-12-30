import { EntitySchema } from "typeorm";

export const Ticket = new EntitySchema({
  name: "Ticket",
  tableName: "tickets",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    title: {
      type: String,
    },
    description: {
      type: "text",
    },
    customer_email: {
      type: String,
    },
    status: {
      type: "enum",
      enum: ["open", "pending", "resolved"],
      default: "open",
    },
    priority: {
      type: "enum",
      enum: ["low", "medium", "high"],
      default: "high",
    },
    created_at: {
      type: "timestamp",
      createDate: true,
    },
    updated_at: {
      type: "timestamp",
      updateDate: true,
    },
    deleted_at: {
      type: "timestamp",
      nullable: true,
    },
  },
  relations: {
    notes: {
      type: "one-to-many",
      target: "Note",
      inverseSide: "ticket",
    },
  },
});
