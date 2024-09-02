import { Router } from "express";
import barrioController from "../controllers/barrioController.js";
import { authClient } from "../middleware/auth.js";

const barrioRoutes = Router();

barrioRoutes.get("/", authClient, barrioController.getAll);
barrioRoutes.get(":id", authClient, barrioController.findById);
barrioRoutes.post("/", authClient, authClient, barrioController.postBarrio);
barrioRoutes.put(":id", authClient, barrioController.putBarrio);
barrioRoutes.delete(":id", authClient, barrioController.delete);

// ** OTHERS

barrioRoutes.get("/name/:name", authClient, barrioController.getBarrioByName);

// ** LISTAR TODOS LOS BARRIOS DE UNA CIUDAD ESP
barrioRoutes.get(
  "/barriosCiudad/:id",
  authClient,
  barrioController.getBarrioByCiudad
);

// ** LISTAR TODOS LOS BARRIOS DE UN PAIS ESP
barrioRoutes.get("/barrioPais", authClient, barrioController.getBarrioByPais
    
);

export default barrioRoutes;
