import { EntitySchema } from "typeorm";

export const User = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: String,
      length: 100,
    },
    email: {
      type: String,
      unique: true,
    },
    password_hash: {
      type: String,
    },
    created_at: {
      type: "timestamp",
      createDate: true,
    },
  },
});
