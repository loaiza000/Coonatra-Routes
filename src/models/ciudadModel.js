import mongoose, { Types } from "mongoose";

const { model, Schema } = mongoose;

const ciudadSchema = new Schema(
  {
    nombre: {
      type: String,
      require: [true, "el campo nombre de ciudad es obligatorio"],
    },
    codigoPostal: {
      type: String,
      require: [true, "el campo codigo postal de ciudad es obligatorio"],
    },

    pais: { type: mongoose.Schema.ObjectId, ref: "pais" },
  },
  {
    timestamps: true,
  }
);

export const ciudadModel = model("ciudad", ciudadSchema);
