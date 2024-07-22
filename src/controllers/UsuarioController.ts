import { Request, Response } from 'express';
import bcrypt from 'bcryptjs'; // Importa a biblioteca bcrypt para hash de senhas
import { Usuario } from './../entity/Usuario';
import { UsuarioService } from '../services/UsuarioService';

export class UsuarioController {

  static async criar(req: Request, res: Response) {
    try {
      const usuarioService = await UsuarioService.getInstance();

      // Cria o novo usuário com os dados fornecidos
      const usuario = new Usuario();
      usuario.nome = req.body.nome;
      usuario.email = req.body.email;
      usuario.senha = req.body.senha;
      usuario.foto = req.body.foto;
      usuario.saldo = req.body.saldo;
      usuario.receitas = req.body.receitas || []; // Define um array vazio se não fornecido
      usuario.despesas = req.body.despesas || []; // Define um array vazio se não fornecido

      const salt = bcrypt.genSaltSync(10)
      usuario.senha = bcrypt.hashSync(usuario.senha, salt)

      const usuarioCriado = await usuarioService.criar(usuario);

  
      
      return res.status(201).json(usuarioCriado);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar usuário', error });
    }
  }

  static async listarTodos(req: Request, res: Response) {
    try {
      const usuarioService = await UsuarioService.getInstance();
      const usuarios = await usuarioService.listar();

      return res.status(200).json(usuarios);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao listar os usuários', error });
    }
  }

  static async listarUm(req: Request, res: Response){
    try{
      const usuarioService = await UsuarioService.getInstance()
      const usuario = await usuarioService.buscarPorId(Number(req.params.id))
    
        if(!usuario){
        return res.status(404).json({message: 'Usuário não encontrado.'})
      }

      
      return res.status(200).json(usuario)
    }
    catch(error){
      return res.status(500).json({message: "erro ao listar 1 usuário"})
    }
  }

  static async deletar(req: Request, res: Response) {
    try {
        
        const usuarioService = await UsuarioService.getInstance()
        const usuario = await usuarioService.buscarPorId(Number(req.params.id))
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' })
        }
        await usuarioService.deletar(usuario.id);
        return res.status(200).json({ message: 'Usuário deletado com sucesso' })
    } catch (error) {
        return res.status(500).json({message: "Erro ao deletar o usuário"})
    }
  }




}
