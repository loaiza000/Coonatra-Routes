import mongoose from "mongoose";

const { model, Schema } = mongoose;

const barrioSchema = new Schema(
  {
    nombre: {
      type: String,
      require: [true, "el campo nombre de barrio es obligatorio"],
    },
    ciudad: { type: mongoose.Schema.ObjectId, ref: "ciudad" },
    pais: { type: mongoose.Schema.ObjectId, ref: "pais" },
  },
  {
    timestamps: true,
  }
);

export const barrioModel = model("barrio", barrioSchema);
