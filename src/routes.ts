import Router from 'express'

import { UsuarioController } from './controllers/UsuarioController'

const router = Router()

router.get("/usuarios", UsuarioController.listar)

router.post("/usuario", UsuarioController.criar)

router.delete("/usuario/:id", UsuarioController.deletar)



export default router