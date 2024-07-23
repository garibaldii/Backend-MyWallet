import Router from "express";
import { UsuarioComumController } from "../controllers/UsuarioComumController";


const router = Router();

// router.get("/", UsuarioController.listarTodos);
// router.get("/:id", UsuarioController.listarUm);
router.post("/", UsuarioComumController.criar);
// router.delete("/:id", UsuarioController.deletar);






export default router