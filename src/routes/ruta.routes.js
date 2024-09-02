import { Router } from "express";
import rutaController from "../controllers/rutaController.js";
import { authClient } from "../middleware/auth.js";

const rutaRoutes = Router();

rutaRoutes.get("/", authClient, rutaController.getAll);
rutaRoutes.get(":id", authClient, rutaController.getById);
rutaRoutes.post("/", authClient, rutaController.postRuta);
rutaRoutes.put(":id", authClient, rutaController.putRuta);
rutaRoutes.delete(":id", authClient, rutaController.deleteRuta);

// ** OTHERS

rutaRoutes.get("/number/:number", authClient, rutaController.getRutaByNumber);

// ** LISTAR RUTAS POR CIUDAD ESP
rutaRoutes.get("/rutasCiudad/:id", authClient, rutaController.getRutaByCiudad)

export default rutaRoutes;
