import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDb } from "./database.js";
connectDb();

import paisRoutes from "./routes/pais.routes.js";
import ciudadRoutes from "./routes/ciudad.routes.js";
import barrioRoutes from "./routes/barrio.routes.js";
import rutaRoutes from "./routes/ruta.routes.js";
import conductoresRoutes from "./routes/conductores.routes.js";
import busesRoutes from "./routes/buses.routes.js";
import empresaBusesRoutes from "./routes/empresaBuses.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.set("Port", 4000);
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/pais", paisRoutes);
app.use("/ciudad", ciudadRoutes);
app.use("/barrio", barrioRoutes);
app.use("/buses", busesRoutes);
app.use("/empresa", empresaBusesRoutes);
app.use("/rutas", rutaRoutes);
app.use("/conductores", conductoresRoutes);
app.use("/users", userRoutes);

app.listen(app.get("Port"), () => {
  console.log("Escuchando por el puerto", app.get("Port"));
});

