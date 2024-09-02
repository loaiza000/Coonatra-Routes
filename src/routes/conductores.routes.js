import { Router } from "express";
import conductoresController from "../controllers/conductoresController.js";
import { authClient } from "../middleware/auth.js";

const conductoresRoutes = Router();

conductoresRoutes.get("/", authClient, conductoresController.getAll);
conductoresRoutes.get(":id", authClient, conductoresController.getById);
conductoresRoutes.post("/", authClient, conductoresController.postConductor);
conductoresRoutes.put(":id", authClient, conductoresController.putConductor);
conductoresRoutes.delete(
  ":id",
  authClient,
  conductoresController.deleteConductor
);

// ** OTHERS

conductoresRoutes.get(
  "/name/:name",
  authClient,
  conductoresController.getConductorByName
);

// ** LISTAR CONDUCTORES POR EMPRESA ESP
conductoresRoutes.get(
  "/conductoresEmpresa/:id",
  authClient,
  conductoresController.getConductoresByEmpresa
);

export default conductoresRoutes;
