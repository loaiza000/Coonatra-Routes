import { Router } from "express";
import paisController from "../controllers/paisController.js";
import { authClient } from "../middleware/auth.js";

const paisRoutes = Router();

paisRoutes.get("/", authClient, paisController.getAll);
paisRoutes.get(":id", authClient, paisController.getById);
paisRoutes.post("/", authClient, paisController.postPais);
paisRoutes.put(":id", authClient, paisController.putPais);
paisRoutes.delete(":id", authClient, paisController.deletePais);

// ** OTHERS

paisRoutes.get("/name/:name", authClient, paisController.getPaisByName);

export default paisRoutes;
