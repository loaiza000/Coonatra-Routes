import { Router } from "express";
import empresaBusesController from "../controllers/empresaBusesController.js";
import { authClient } from "../middleware/auth.js";

const empresaBusesRoutes = Router();

empresaBusesRoutes.get("/", authClient, empresaBusesController.getAll);
empresaBusesRoutes.get(":id", authClient, empresaBusesController.getById);
empresaBusesRoutes.post("/", authClient, empresaBusesController.postEmpresa);
empresaBusesRoutes.put(":id", authClient, empresaBusesController.putEmpresa);
empresaBusesRoutes.delete(
  ":id",
  authClient,
  empresaBusesController.deleteEmpresa
);

// ** OTHERS

empresaBusesRoutes.get(
  "/name/:name",
  authClient,
  empresaBusesController.getEmpresaByName
);

// ** LISTAR EMPRESAS PAIS ESP
empresaBusesRoutes.get(
  "/empresaPais/:id",
  authClient,
  empresaBusesController.getEmpresasByPais
);

export default empresaBusesRoutes;
