import mongoose from "mongoose";

const { model, Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: [true, "el nombre de ususario es requerido"],
      unique: true,
    },
    email: {
      type: String,
      require: [true, "el campo email es requerido"],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "el campo password es requerido"],
    },
  },
  {
    timestamps: true,
  }
);

export const userModel = model("user", userSchema);
