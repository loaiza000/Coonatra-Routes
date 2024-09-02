import mongoose from "mongoose";

const { model, Schema } = mongoose;

const paisSchema = new Schema(
  {
    nombre: { type: String, require: [true, "el campo nombre es obligatorio"] },
    codigoPostal: {
      type: Number,
      require: [true, "el campo codigo postal es obligatorio"],
    },
    identidad: {
      type: String,
      require: [true, "el campo identidad es obligatorio"],
    },
  },
  {
    timestamps: true,
  }
);

export const paisModel = model("pais", paisSchema);
