import { Router } from "express";
import ciudadController from "../controllers/ciudadController.js";
import { authClient } from "../middleware/auth.js";

const ciudadRoutes = Router();

ciudadRoutes.get("/", authClient, ciudadController.getAll);
ciudadRoutes.get(":id", authClient, ciudadController.getById);
ciudadRoutes.post("/", authClient, ciudadController.postCiudad);
ciudadRoutes.put(":id", authClient, ciudadController.putCiudad);
ciudadRoutes.delete(":id", authClient, ciudadController.deleteCiudad);

// ** OTHERS

ciudadRoutes.get("/name/:name", authClient, ciudadController.getCiudadByName);

// ** LISTAR TODOS LAS CIUDADES DE UN PAIS ESP
ciudadRoutes.get(
  "/ciudadPais/:id",
  authClient,
  ciudadController.getAllCiudadesByPais
);

export default ciudadRoutes;
