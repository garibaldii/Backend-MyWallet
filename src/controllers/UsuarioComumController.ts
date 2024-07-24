import { Request, Response } from 'express';
import bcrypt from 'bcryptjs'; // Importa a biblioteca bcrypt para hash de senhas
import { UsuarioComum } from '../entity/UsuarioComum';
import { UsuarioComumService } from '../services/UsuarioComumService';
import jwt from 'jsonwebtoken'; // Importa a biblioteca para decodificar o JWT


export class UsuarioComumController {

  static async criar(req: Request, res: Response) {
    try {
      const usuarioComumService = await UsuarioComumService.getInstance();

      // Cria o novo usuário com os dados fornecidos
      const usuarioComum = new UsuarioComum();
      usuarioComum.nome = req.body.nome;
      usuarioComum.email = req.body.email;
      usuarioComum.senha = req.body.senha;
      usuarioComum.foto = req.body.foto;
      usuarioComum.saldo = req.body.saldo;
      usuarioComum.receitas = req.body.receitas || []; // Define um array vazio se não fornecido
      usuarioComum.despesas = req.body.despesas || []; // Define um array vazio se não fornecido

      const salt = bcrypt.genSaltSync(10)
      usuarioComum.senha = bcrypt.hashSync(usuarioComum.senha, salt)

      const usuarioCriado = await usuarioComumService.criar(usuarioComum);

  
      
      return res.status(201).json(usuarioCriado);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar usuário', error });
    }
  }

  static async listarTodos(req: Request, res: Response) {
    try {
      const usuarioComumService = await UsuarioComumService.getInstance();
      const usuarios = await usuarioComumService.listar();

      return res.status(200).json(usuarios);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao listar os usuários', error });
    }
  }

  static async listarUm(req: Request, res: Response){
    try{
      const usuarioComumService = await UsuarioComumService.getInstance()
      const usuarioComum = await usuarioComumService.buscarPorId(Number(req.params.id))
    
        if(!usuarioComum){
        return res.status(404).json({message: 'Usuário não encontrado.'})
      }

      
      return res.status(200).json(usuarioComum)
    }
    catch(error){
      return res.status(500).json({message: "erro ao listar 1 usuário"})
    }
  }

  static async deletar(req: Request, res: Response) {
    try {
        
        const usuarioComumService = await UsuarioComumService.getInstance()
        const usuarioComum = await usuarioComumService.buscarPorId(Number(req.params.id))
        if (!usuarioComum) {
            return res.status(404).json({ message: 'Usuário não encontrado' })
        }
        await usuarioComumService.deletar(usuarioComum.id);
        return res.status(200).json({ message: 'Usuário deletado com sucesso' })
    } catch (error) {
        return res.status(500).json({message: "Erro ao deletar o usuário"})
    }
  }

  





}
