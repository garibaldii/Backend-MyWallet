import Router from "express";
import { UsuarioComumController } from "../controllers/UsuarioComumController";
import upload from "../middlewares/UploadMiddleware";


const router = Router();

// router.get("/", UsuarioController.listarTodos);
router.get("/:id", UsuarioComumController.listarUm);
router.post("/",upload.single('foto'), UsuarioComumController.criar);

// router.delete("/:id", UsuarioController.deletar);






export default router