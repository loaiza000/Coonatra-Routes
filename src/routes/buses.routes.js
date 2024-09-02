import { Router } from "express";
import busesController from "../controllers/busesController.js";
import { authClient } from "../middleware/auth.js";

const busesRoutes = Router();

busesRoutes.get("/", authClient, busesController.getAll);
busesRoutes.get(":id", authClient, busesController.getById);
busesRoutes.post("/", authClient, busesController.postBus);
busesRoutes.put(":id", authClient, busesController.putBus);
busesRoutes.delete(":id", authClient, busesController.deleteBus);

// **OTHERS

busesRoutes.get("/placa/:placa", authClient, busesController.getBusesByPlaca);

// ** LISTAR TODOS LOS BUSES DE UNA RUTA ESP
busesRoutes.get("/busesRuta/:id", authClient, busesController.bussesByRuta);

// ** LISTAR TODOS LOS BUSES DE UNA EMPRESA ESP
busesRoutes.get(
  "/busesEmpresa/:id",
  authClient,
  busesController.busesByEmpresa
);

// ** TOTAL DE GANANCIAS DE UN BUS
busesRoutes.get(
  "/ganancias/:id",
  authClient,
  busesController.getGananciasByBus
);

export default busesRoutes;
