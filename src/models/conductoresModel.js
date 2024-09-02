import mongoose from "mongoose";

const { model, Schema } = mongoose;

const conductoresSchema = new Schema(
  {
    nombre: { type: String, require: [true, "el campo nombre es obligatorio"] },
    apellido: {
      type: String,
      require: [true, "el campo apellido es obligatorio"],
    },
    edad: { type: Number, require: [true, "el campo edad es obligatorio"] },
    correo: { type: String, require: [true, "el campo correo es obligatorio"] },
    empresaBuses: { type: mongoose.Schema.ObjectId, ref: "empresaBuses" },
    ciudad: { type: mongoose.Schema.ObjectId, ref: "ciudad" },
  },

  {
    timestamps: true,
  }
);

export const conductoresModel = model("conductores", conductoresSchema);
