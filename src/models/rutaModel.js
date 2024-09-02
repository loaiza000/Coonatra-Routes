import mongoose from "mongoose";

const { model, Schema } = mongoose;

const rutaSchema = new Schema(
  {
    numeroRuta: {
      type: Number,
      require: [true, "el campo numero de ruta es obligatorio"],
    },
    empresaBuses: { type: mongoose.Schema.ObjectId, ref: "empresaBuses" },
    conductor: { type: mongoose.Schema.ObjectId, ref: "conductores" },
    barrio: { type: mongoose.Schema.ObjectId, ref: "barrio" },
    ciudad: { type: mongoose.Schema.ObjectId, ref: "ciudad" },
    pais: { type: mongoose.Schema.ObjectId, ref: "pais" },
  },
  {
    timestamps: true,
  }
);

export const rutaModel = model("ruta", rutaSchema);
