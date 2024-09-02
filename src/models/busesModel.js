import mongoose from "mongoose";

const { model, Schema } = mongoose;

const busesSchema = new Schema(
  {
    placa: { type: String, require: [true, "el campo placa es obligatorio"] },
    conductores: { type: mongoose.Schema.ObjectId, ref: "conductores" },
    empresaBuses: { type: mongoose.Schema.ObjectId, ref: "empresaBuses" },
    ruta: { type: mongoose.Schema.ObjectId, ref: "ruta" },
  },
  {
    timestamps: true,
  }
);

export const busesModel = model("buses", busesSchema);
