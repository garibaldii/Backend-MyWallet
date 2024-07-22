import Router from "express";
import { ReceitaController } from "../controllers/ReceitaController";
import { authenticateJWT } from "../middlewares/AuthMiddleware";


const router = Router();

router.use(authenticateJWT)

router.post("/", ReceitaController.criar);
router.delete("/", ReceitaController.deletarTodos);
router.delete("/:id", ReceitaController.deletarUm);
router.get("/", ReceitaController.listarTodos);
router.get("/:id", ReceitaController.listarUm);
router.put("/:id", ReceitaController.atualizar);


export default router