import mongoose from "mongoose";

const { model, Schema } = mongoose;

const empresaBusesSchema = new Schema(
  {
    nombre: {
      type: String,
      require: [true, "el campo nombre empresa de buses es obligatorio"],
    },
    runt: { type: String, require: [true, "el campo runt es obligatorio"] },
    rut: { type: String, require: [true, "el campo rut es obligatorio"] },
    pais: { type: mongoose.Schema.ObjectId, ref: "pais" },
  },
  {
    timestamps: true,
  }
);

export const empresaBusesModel = model("empresaBuses", empresaBusesSchema);
