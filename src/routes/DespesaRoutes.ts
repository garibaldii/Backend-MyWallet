import Router from "express";
import { DespesaController } from "../controllers/DespesaController";
import { authenticateJWT } from "../middlewares/authMiddleware"


const router = Router();

router.use(authenticateJWT)

router.post("/", DespesaController.criar);
router.post("/:idDespesa/operacao/:idUsuarioComum", DespesaController.realizarOperacao)
router.delete("/", DespesaController.deletarTodos);
router.delete("/:id", DespesaController.deletarUm);
router.get("/", DespesaController.listarTodos);
router.get("/:id", DespesaController.listarUm);
router.put("/:id", DespesaController.atualizar);



export default router