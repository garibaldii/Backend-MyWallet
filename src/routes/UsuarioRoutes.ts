import Router from "express";
import { UsuarioController } from "../controllers/UsuarioController";


const router = Router();

// router.get("/", UsuarioController.listarTodos);
// router.get("/:id", UsuarioController.listarUm);
router.post("/", UsuarioController.criar);
// router.delete("/:id", UsuarioController.deletar);






export default router